<?php
class DatabaseHelper {

    private $mMySQLConnection = null;
    private $mServerName = "localhost";
    private $mServerPort = 3306;
    private $mUserName = "blog";
    private $mPassword = "guoguo";
    private $mDatabaseName = "blog";
    private $mConnUrl;

    public function __construct( $username, $password, $databaseName){
        $this->mUserName = $username;
        $this->mPassword = $password;
        $this->mDatabaseName = $databaseName;
        $this->mConnUrl = "mysql:host=" . $this->mServerName . ";"  .
                          "port=" . $this->mServerPort . ";" .
                          "dbname=" . $this->mDatabaseName;

        $this->getSQLConnection();
    }


    public function __destruct(){
             $this->mServerName = null;
             $this->mUserName = null;
             $this->mPassword = null;
             $this->mDatabaseName = null;
             $this->mMySQLConnection = null;
             $this->mConnUrl = null;
    }

    public function getDatanaseName(){
        return $this->mDatabaseName;
    }

    public function getSQLConnection(){
        if( $this->mMySQLConnection == null){
            $this->mMySQLConnection = new PDO(
                $this->mConnUrl,
                $this->mUserName,
                $this->mPassword,
                array(PDO::ATTR_PERSISTENT => true)
            );
            $this->mMySQLConnection->exec('set names utf8');
        }

        return $this->mMySQLConnection;
    }

    public function query($sql){
        $ret = null;
//        error_log("DatabaseHelper: query  " + $sql, 3, "log.txt");
        if($this->mMySQLConnection != null){
            $ret = $this->mMySQLConnection->query($sql);
        }
        return $ret;
    }
}