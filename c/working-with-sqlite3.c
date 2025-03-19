#include <sqlite3.h>
#include <stdio.h>

sqlite3 *setupDB() {
  sqlite3 *db;
  int rc = sqlite3_open("demo.db", &db);
  if (rc != SQLITE_OK){
        fprintf(stderr, "can not open databse %s\n", sqlite3_errmsg(db));
        return NULL;
  }
  return db;
}

int main() {
    sqlite3 *db = setupDB();
   if (!db){
           return 1;
   } 
   printf("databse has been opened");
   sqlite3_close(db);
        return 0; }
