package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"regexp"
	"strings"
)

func transFile(w http.ResponseWriter, fpath string) {
	fin, err := os.Open(fpath)
	if err != nil {
		log.Fatal("Fatal: ", err)
	} else {
		buf := make([]byte, 1024)
		for {
			n, _ := fin.Read(buf)
			if 0 == n {
				break
			}
			w.Write(buf[:n])
		}
	}
}

func transStaticResourceFile(w http.ResponseWriter, fpath string) {
	request_type := fpath[strings.LastIndex(fpath, "."):]
	switch request_type {
	case ".css":
		w.Header().Set("content-type", "text/css")
	case ".js":
		w.Header().Set("content-type", "text/javascript")
	case "html":
		w.Header().Set("content-type", "text/html")
	default:
	}
	transFile(w, fpath)
}

func router(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	fmt.Println(r.Form)
	fmt.Println("path ", r.URL.Path)
	fmt.Println("scheme ", r.URL.Scheme)
	fmt.Println(r.Form["url_long"])

	for k, v := range r.Form {
		fmt.Println("Key: ", k)
		fmt.Println("Vak: ", strings.Join(v, ""))
	}

	if r.URL.Path == "/" {
		http.Redirect(w, r, "/index.html", 303)
	}

	target := r.URL.Path

	staticResReg := "^[^0-9][a-zA-Z0-9_-].*?(jpg)|(git)|(css)|(js)|(ico)|(html)$"
	reg, _ := regexp.Compile(staticResReg)

	if reg.MatchString(target) {
		targetFilePath := SERVER_ROOT_PATH + target[1:]
		fmt.Println(targetFilePath)
		transStaticResourceFile(w, targetFilePath)
	}

}

var SERVER_ROOT_PATH string = "../"

func main() {
	http.HandleFunc("/", router)
	err := http.ListenAndServe(":80", nil)
	if err != nil {
		log.Fatal("ListenAndServe", err)
	}

}
