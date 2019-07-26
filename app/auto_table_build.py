#!/usr/bin/python
# -*- coding: UTF-8 -*-

import MySQLdb

# 打开数据库连接
db = MySQLdb.connect("localhost", "root", "123456", "im_k_data", charset='utf8' )

# 使用cursor()方法获取操作游标 
cursor = db.cursor()

# 如果数据表已经存在使用 execute() 方法删除表。//k线时间类型 1min, 5min, 15min, 30min, 60min, 1day, 1mon, 1week, 1year
cursor.execute("DROP TABLE IF EXISTS k_huobi_btcusdt_1min")
cursor.execute("DROP TABLE IF EXISTS k_huobi_btcusdt_5min")
cursor.execute("DROP TABLE IF EXISTS k_huobi_btcusdt_15min")
cursor.execute("DROP TABLE IF EXISTS k_huobi_btcusdt_30min")
cursor.execute("DROP TABLE IF EXISTS k_huobi_btcusdt_60min")
cursor.execute("DROP TABLE IF EXISTS k_huobi_btcusdt_1day")
cursor.execute("DROP TABLE IF EXISTS k_huobi_btcusdt_1mon")
cursor.execute("DROP TABLE IF EXISTS k_huobi_btcusdt_1week")
cursor.execute("DROP TABLE IF EXISTS k_huobi_btcusdt_1year")
cursor.execute("DROP TABLE IF EXISTS k_huobi_ethusdt_5min")

cursor.execute("DROP TABLE IF EXISTS k_huobi_ethusdt_1min")
cursor.execute("DROP TABLE IF EXISTS k_huobi_eosusdt_1min")



# 创建火币usdt_btc数据表SQL语句
sql_k_huobi_btcusdt_1min = """CREATE TABLE k_huobi_btcusdt_1min (
        ID  INT NOT NULL ,
        OPEN CHAR(20) ,
        CLOSE CHAR(20) , 
        LOW CHAR(20)  ,
        HIGH CHAR(20) ,
        AMOUNT CHAR(20) ,
        VOL CHAR(20) ,
        COUNT CHAR(20)
                            )"""
sql_k_huobi_btcusdt_5min = """CREATE TABLE k_huobi_btcusdt_5min (
        ID  INT NOT NULL ,
        OPEN CHAR(20) ,
        CLOSE CHAR(20) , 
        LOW CHAR(20)  ,
        HIGH CHAR(20) ,
        AMOUNT CHAR(20) ,
        VOL CHAR(20) ,
        COUNT CHAR(20)
                            )"""
sql_k_huobi_btcusdt_15min = """CREATE TABLE k_huobi_btcusdt_15min (
        ID  INT NOT NULL ,
        OPEN CHAR(20) ,
        CLOSE CHAR(20) , 
        LOW CHAR(20)  ,
        HIGH CHAR(20) ,
        AMOUNT CHAR(20) ,
        VOL CHAR(20) ,
        COUNT CHAR(20)
                            )"""
sql_k_huobi_btcusdt_30min = """CREATE TABLE k_huobi_btcusdt_30min (
        ID  INT NOT NULL ,
        OPEN CHAR(20) ,
        CLOSE CHAR(20) , 
        LOW CHAR(20)  ,
        HIGH CHAR(20) ,
        AMOUNT CHAR(20) ,
        VOL CHAR(20) ,
        COUNT CHAR(20)
                            )"""
sql_k_huobi_btcusdt_60min = """CREATE TABLE k_huobi_btcusdt_60min (
        ID  INT NOT NULL ,
        OPEN CHAR(20) ,
        CLOSE CHAR(20) , 
        LOW CHAR(20)  ,
        HIGH CHAR(20) ,
        AMOUNT CHAR(20) ,
        VOL CHAR(20) ,
        COUNT CHAR(20)
                            )"""
sql_k_huobi_btcusdt_1day = """CREATE TABLE k_huobi_btcusdt_1day (
        ID  INT NOT NULL ,
        OPEN CHAR(20) ,
        CLOSE CHAR(20) , 
        LOW CHAR(20)  ,
        HIGH CHAR(20) ,
        AMOUNT CHAR(20) ,
        VOL CHAR(20) ,
        COUNT CHAR(20)
                            )"""
sql_k_huobi_btcusdt_1mon = """CREATE TABLE k_huobi_btcusdt_1mon (
        ID  INT NOT NULL ,
        OPEN CHAR(20) ,
        CLOSE CHAR(20) , 
        LOW CHAR(20)  ,
        HIGH CHAR(20) ,
        AMOUNT CHAR(20) ,
        VOL CHAR(20) ,
        COUNT CHAR(20)
                            )"""
sql_k_huobi_btcusdt_1week = """CREATE TABLE k_huobi_btcusdt_1week (
        ID  INT NOT NULL ,
        OPEN CHAR(20) ,
        CLOSE CHAR(20) , 
        LOW CHAR(20)  ,
        HIGH CHAR(20) ,
        AMOUNT CHAR(20) ,
        VOL CHAR(20) ,
        COUNT CHAR(20)
                            )"""
sql_k_huobi_btcusdt_1year = """CREATE TABLE k_huobi_btcusdt_1year (
        ID  INT NOT NULL ,
        OPEN CHAR(20) ,
        CLOSE CHAR(20) , 
        LOW CHAR(20)  ,
        HIGH CHAR(20) ,
        AMOUNT CHAR(20) ,
        VOL CHAR(20) ,
        COUNT CHAR(20)
                            )"""

sql_k_huobi_ethusdt_1min = """CREATE TABLE k_huobi_ethusdt_1min (
        ID  INT NOT NULL ,
        OPEN CHAR(20) ,
        CLOSE CHAR(20) , 
        LOW CHAR(20)  ,
        HIGH CHAR(20) ,
        AMOUNT CHAR(20) ,
        VOL CHAR(20) ,
        COUNT CHAR(20)
                            )"""
sql_k_huobi_eosusdt_1min = """CREATE TABLE k_huobi_eosusdt_1min (
        ID  INT NOT NULL ,
        OPEN CHAR(20) ,
        CLOSE CHAR(20) , 
        LOW CHAR(20)  ,
        HIGH CHAR(20) ,
        AMOUNT CHAR(20) ,
        VOL CHAR(20) ,
        COUNT CHAR(20)
                            )"""



#创建
# cursor.execute(sql_k_huobi_btcusdt_1min)
# cursor.execute(sql_k_huobi_btcusdt_5min)
# cursor.execute(sql_k_huobi_btcusdt_15min)
# cursor.execute(sql_k_huobi_btcusdt_30min)
# cursor.execute(sql_k_huobi_btcusdt_60min)
# cursor.execute(sql_k_huobi_btcusdt_1day)
# cursor.execute(sql_k_huobi_btcusdt_1week)
# cursor.execute(sql_k_huobi_btcusdt_1mon)
# cursor.execute(sql_k_huobi_ethusdt_1min)
# cursor.execute(sql_k_huobi_eosusdt_1min)

# 关闭数据库连接
db.close()



