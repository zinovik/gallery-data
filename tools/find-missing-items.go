package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"strings"
)

type File struct {
	Path        string
	Filename    string
	Thumbnail   string
	Description string
	Text        interface{}
}

type Section struct {
	Title string
	Path  string
	Text  interface{}
}

func main() {
	filesFile, _ := ioutil.ReadFile("files.json")
	fileUrlsFile, _ := ioutil.ReadFile("file-urls.json")
	sectionsFile, _ := ioutil.ReadFile("sections.json")

	var files []File
	var fileUrls []string
	var sections []Section

	json.Unmarshal(filesFile, &files)
	json.Unmarshal(fileUrlsFile, &fileUrls)
	json.Unmarshal(sectionsFile, &sections)

	for _, file := range files {
		var isMissingFileUrl = true
		for _, fileUrl := range fileUrls {
			if strings.Contains(fileUrl, file.Filename) {
				isMissingFileUrl = false
			}
		}
		if isMissingFileUrl {
			fmt.Println("ERROR: Missing file url for the file: ", file.Filename)
		}

		var isMissingSection = true
		for _, section := range sections {
			if section.Path == file.Path {
				isMissingSection = false
			}
		}
		if isMissingSection {
			fmt.Println("ERROR: Missing section for the file path: ", file.Path)
		}

		if file.Description == "" {
			fmt.Printf("WARNING: Missing file description for the file: %s (%s)\n", file.Filename, file.Path)
		}
	}

	for _, fileUrl := range fileUrls {
		var isMissingFileForUrl = true
		for _, file := range files {
			if strings.Contains(fileUrl, file.Filename) {
				isMissingFileForUrl = false
			}
		}
		if isMissingFileForUrl {
			fmt.Println("ERROR: Missing file for the url: ", fileUrl)
		}
	}

	for _, section := range sections {
		var isMissingFileForSection = true
		for _, file := range files {
			if file.Path == section.Path {
				isMissingFileForSection = false
			}
		}
		if isMissingFileForSection && section.Text == nil {
			fmt.Println("WARNING: Missing files and text for the section: ", section.Path)
		}
	}
}
