<?php

// Ensure temporary writable directories exist for Laravel on Vercel Serverless
$storageDirs = [
    '/tmp/views',
    '/tmp/sessions',
    '/tmp/cache',
    '/tmp/logs',
];

foreach ($storageDirs as $dir) {
    if (!is_dir($dir)) {
        @mkdir($dir, 0777, true);
    }
}

// Forward request to Laravel public/index.php
require __DIR__ . '/../public/index.php';
