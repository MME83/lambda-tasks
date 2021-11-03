// const fs = require('fs');
const { promises: fs } = require('fs');

const path = require('path');
const filesPath = path.join(__dirname, 'upload');

const arrOfFileNames = async (filesPath) => {
    let fileNames;

    try {
        fileNames = await fs.readdir(filesPath);
    } catch (err) {
        console.log('error:', err);
    };

    if (fileNames.length === 0) {
        console.log('No files in directory');
    } else {
        return fileNames;
    };
};

const showFileNames = async (filesPath) => {
    const arr = await arrNameOfFiles(filesPath);

    return console.log('here is:', arr);
};

async function getContent(filePath, encoding = 'utf-8') {
    if (!filePath) {
        throw new Error("filePath required");
    }

    return fs.readFile(filePath, { encoding });
};

const arrOfPhrases = async (filesPath, fileName) => {
    const content = (await getContent(path.join(filesPath, fileName))).toString().split('\n');

    return content;
};

const uniqueValues = async (setDifference, setPhrasesFromFile) => {
    return new Set([...setDifference].filter(x => !setPhrasesFromFile.has(x)).concat([...setPhrasesFromFile].filter(x => !setDifference.has(x))));
};

const existInAllFiles = (setIntersection, setPhrasesFromFile) => {
    return new Set([...setIntersection].filter(x => setPhrasesFromFile.has(x)));
};

const existInAtLeastTen = (arrOfPhrases) => {
    const phrasesAndRepetitions = {};

    arrOfPhrases.forEach(item => {
        phrasesAndRepetitions[item] = (phrasesAndRepetitions[item] || 0) + 1;
    });

    return Object.values(phrasesAndRepetitions).filter(el => el >= 10).length;
}

(async () => {
    const fileNames = await arrOfFileNames(filesPath);

    let difference = new Set();
    let intersection = new Set(await arrOfPhrases(filesPath, fileNames[0]));
    let union = [];

    console.log('TASK 2\n');

    for (let i = 0; i < fileNames.length; i++) {
        const setOfPhrases = new Set(await arrOfPhrases(filesPath, fileNames[i]));

        difference = await uniqueValues(difference, setOfPhrases);
        
        intersection = existInAllFiles(intersection, setOfPhrases);

        union = [...union, ...setOfPhrases];
        
        console.log('iteration:', i + 1, '| fileName:', fileNames[i], '| unique Phrases in file:', setOfPhrases.size);
    };
    
    console.log('---------------------------\nPart I - Unique phrases in all files \n');
    console.log('unique Phrases in all files:', difference.size, '\n');

    console.log('---------------------------\nPart II - Phrases that are in all files \n');
    console.log('phrases that are present in all files:', intersection.size, '\n');

    const phrasesInTen = existInAtLeastTen(union); 

    console.log('---------------------------\nPart II - Phrases that are in at least ten files \n');
    console.log('phrases that are present min in 10 files:', phrasesInTen, '\n');
    
    difference = null;
    intersection = null;
    union = null;
})();
