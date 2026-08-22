<?php

// Ensure temporary writable directories exist for Laravel on Vercel Serverless
$storageDirs = [
    '/tmp/views',
    '/tmp/sessions',
    '/tmp/cache',
    '/tmp/logs',
    '/tmp/framework',
    '/tmp/framework/views',
    '/tmp/framework/sessions',
    '/tmp/framework/cache',
];

foreach ($storageDirs as $dir) {
    if (!is_dir($dir)) {
        @mkdir($dir, 0777, true);
    }
}

// Copy SQLite database to writable /tmp storage on Vercel
$tmpSqlite = '/tmp/database.sqlite';
$srcSqlite = __DIR__ . '/../database/database.sqlite';
if (!file_exists($tmpSqlite)) {
    if (file_exists($srcSqlite)) {
        @copy($srcSqlite, $tmpSqlite);
    } else {
        @touch($tmpSqlite);
    }
}

// Forward request to Laravel public/index.php
require __DIR__ . '/../public/index.php';
