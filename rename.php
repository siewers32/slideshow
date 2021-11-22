<?php
//ENV

$whitelist = ["jpg"];
renameFiles($whitelist);

function renameFiles($whitelist) {
    $dir = __DIR__."/images";
    $files = scandir($dir);
    $counter = 0;
    foreach($files as $key => $filename) {
        $path = $dir."/".$filename;
        $extension = pathinfo($path, PATHINFO_EXTENSION);
        if(in_array($extension, $whitelist)) {
            $counter++;
            $newPath = $dir."/".generateName($counter, $extension, "test");
            echo $path.'--->'.$newPath;
            rename($path, $newPath);
        }
    }
}

function generateName($key, $extension, $name = "") {
    $counter = str_pad($key, 4, "0", STR_PAD_LEFT);
    $chars = [1,2,3,4,5,6,7,8,9,0,'a','b','c','d','e','f','g','h','i','j','k','l',
        'm','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P',
        'Q','R','S','T','U','V','W','X','Y','Z'];
    shuffle($chars);
    //return $counter.'_'.implode(array_slice($chars, 0, 4)).'.'.$extension;
    return $counter.'_'.$name.'.'.$extension;
}





