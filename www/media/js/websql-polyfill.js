(function() {
    if (window.openDatabase) return;

    var databases = {};

    window.openDatabase = function(name, version, displayName, size) {
        if (!databases[name]) {
            databases[name] = { tables: {} };
        }
        var dbStore = databases[name];

        return {
            transaction: function(callback, errorCallback) {
                var tx = new Transaction(dbStore);
                try {
                    callback(tx);
                    tx._executeQueue();
                } catch (e) {
                    if (errorCallback) errorCallback(e);
                }
            }
        };
    };

    function Transaction(dbStore) {
        this._dbStore = dbStore;
        this._queue = [];
    }

    Transaction.prototype.executeSql = function(sql, params, successCallback, errorCallback) {
        params = params || [];
        this._queue.push({ sql: sql, params: params, success: successCallback, error: errorCallback });
    };

    Transaction.prototype._executeQueue = function() {
        for (var i = 0; i < this._queue.length; i++) {
            var item = this._queue[i];
            try {
                var result = executeSql(this._dbStore, item.sql, item.params);
                if (item.success) item.success(this, result);
            } catch (e) {
                if (item.error) item.error(this, e);
            }
        }
    };

    function executeSql(dbStore, sql, params) {
        sql = sql.replace(/\s+/g, ' ').trim();

        if (/^DROP TABLE/i.test(sql)) {
            return execDrop(dbStore, sql);
        } else if (/^CREATE TABLE/i.test(sql)) {
            return execCreate(dbStore, sql);
        } else if (/^INSERT INTO/i.test(sql)) {
            return execInsert(dbStore, sql, params);
        } else if (/^SELECT/i.test(sql)) {
            return execSelect(dbStore, sql, params);
        }
        return makeResultSet([]);
    }

    function execDrop(dbStore, sql) {
        var match = sql.match(/DROP TABLE(?:\s+IF EXISTS)?\s+(\w+)/i);
        if (match) {
            delete dbStore.tables[match[1]];
        }
        return makeResultSet([]);
    }

    function execCreate(dbStore, sql) {
        var match = sql.match(/CREATE TABLE(?:\s+IF NOT EXISTS)?\s+(\w+)\s*\((.+)\)/i);
        if (match) {
            var tableName = match[1];
            if (!dbStore.tables[tableName]) {
                var colDefs = match[2].split(',');
                var columns = [];
                for (var i = 0; i < colDefs.length; i++) {
                    var col = colDefs[i].trim().split(/\s+/)[0];
                    columns.push(col);
                }
                dbStore.tables[tableName] = { columns: columns, rows: [] };
            }
        }
        return makeResultSet([]);
    }

    function execInsert(dbStore, sql, params) {
        var match = sql.match(/INSERT INTO\s+(\w+)\s*\(([^)]+)\)\s*VALUES\s*\((.+)\)/i);
        if (match) {
            var tableName = match[1];
            var columns = match[2].split(',').map(function(c) { return c.trim(); });
            var valuesRaw = match[3];
            var values = parseValues(valuesRaw);
            var table = dbStore.tables[tableName];
            if (table) {
                var row = {};
                for (var i = 0; i < columns.length; i++) {
                    row[columns[i]] = values[i] !== undefined ? values[i] : null;
                }
                table.rows.push(row);
            }
        }
        return makeResultSet([]);
    }

    function parseValues(valuesStr) {
        var values = [];
        var current = '';
        var inQuote = false;
        var quoteChar = '';
        for (var i = 0; i < valuesStr.length; i++) {
            var ch = valuesStr[i];
            if (inQuote) {
                if (ch === quoteChar) {
                    inQuote = false;
                } else {
                    current += ch;
                }
            } else {
                if (ch === '"' || ch === "'") {
                    inQuote = true;
                    quoteChar = ch;
                } else if (ch === ',') {
                    values.push(current.trim());
                    current = '';
                } else {
                    current += ch;
                }
            }
        }
        values.push(current.trim());
        return values;
    }

    function execSelect(dbStore, sql, params) {
        var match = sql.match(/SELECT\s+(.+?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+))?/i);
        if (!match) return makeResultSet([]);

        var tableName = match[2];
        var whereClause = match[3];
        var table = dbStore.tables[tableName];
        if (!table) return makeResultSet([]);

        var rows = table.rows;

        if (whereClause) {
            rows = filterRows(rows, whereClause, params);
        }

        return makeResultSet(rows);
    }

    function filterRows(rows, whereClause, params) {
        var match = whereClause.match(/(\w+)\s*=\s*(.+)/i);
        if (!match) return rows;

        var col = match[1].trim();
        var val = match[2].trim();

        if (val === '?') {
            val = params && params.length > 0 ? params[0] : '';
        } else {
            val = val.replace(/^["']|["']$/g, '');
        }

        var result = [];
        for (var i = 0; i < rows.length; i++) {
            if (rows[i][col] == val) {
                result.push(rows[i]);
            }
        }
        return result;
    }

    function makeResultSet(rows) {
        return {
            rows: {
                length: rows.length,
                item: function(i) { return rows[i]; },
                _data: rows
            },
            rowsAffected: 0,
            insertId: 0
        };
    }
})();
