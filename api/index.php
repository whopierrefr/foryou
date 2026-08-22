<?php

// Ensure all temporary writable storage directories exist for Laravel on Vercel
$storageDirs = [
    '/tmp/storage',
    '/tmp/storage/app',
    '/tmp/storage/logs',
    '/tmp/storage/framework',
    '/tmp/storage/framework/views',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/framework/cache',
    '/tmp/storage/framework/cache/data',
    '/tmp/views',
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
