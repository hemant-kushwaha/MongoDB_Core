// Validations are backuped and restore

// Backup:

// mongodump ->default Mongoserver-> backup all dbs to current working directories with dump name
//(single db & separate BSON files) mongodump --host 127.0.0.1 --port 27017 --out "C:\Users\heman\OneDrive\Desktop\storagedbBackup" --db StorageApp --gzip
//(single db & single BSON file . Also it can be compressed) mongodump --db storageApp --archive="C:\Users\anura\OneDrive\Desktop\storagedbBackup\storageApp.bson"

// Restore:

// mongorestore --port 27018 --> Use default dump directory to restore
// (single db & separate BSON files) mongorestore --host 127.0.0.1 --port 27017 --dir "C:\Users\heman\OneDrive\Desktop\storagedbBackup" --db StorageApp --gzip
// (single db & single BSON file . Also it can be compressed) mongorestore --db storageApp --archive="C:\Users\anura\OneDrive\Desktop\storagedbBackup\storageApp.bson"

//Export:  -> Validations are not exported

// mongoexport --db todo --collection tasks --out tasks.json  --->Object List
// mongoexport --db todo --collection tasks --out tasks.json --jsonArray
// mongoexport --db todo --collection task --out tasks.csv --type=csv --fields "_id,title,status,priority"

// Import:  ->Strict -> Validations are checked

// Object List : mongoimport --collection todos --file tasks.json
// JSON ARRAY : mongoimport --collection todos --file tasks.json --jsonArray
// CSV (oid becomes string -> Not Good): mongoimport --db todo --collection todoss --file tasks.csv --type=csv --fields "_id,title,status,priority"
