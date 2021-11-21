<?php
//ENV
$dir = __DIR__."/images";
$whitelist = [".jpg"];

echo sanitize_images($dir, $whitelist);

function sanitize_images($dir, $whitelist) {
    $images = [];
    $files = scandir($dir);
    foreach($files as $file) {
        if(in_array(substr($file, -4), $whitelist)) {
            $images[] = $file;
        }
    }
    return json_encode($images);
}

function generateName() {
    $chars = [1,2,3,4,5,6,7,8,9,0,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z];
    shuffle($chars);
    return array_slice($chars, 0, 8);
}



