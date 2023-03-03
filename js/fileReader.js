class FileReader {
    constructor(file) {
        this.file = file;
    }

    setFile(file) {
        this.file = file;
    }


    readTextFile() {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", this.file, false);
        var allText = "";
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    allText = rawFile.responseText;
                }
            }
        }
        rawFile.send(null);
        return allText;
    }
}

const fileReader = new FileReader("");
export {
    fileReader
};