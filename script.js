"use strict";

const transformers_map = {
    simple : [
        NyaTransform
    ],
    myadvanced : [NyaTransform, MyaTransform],
    ya : [YaTransform],
    extraordinary : [VowelsTransform],
    full : [VowelsTransform, ConsonatsTransform],
};

const YaMap = {
    "а" : "я",
    "А" : "Я",
};

const VowelsMap = {
    "а" : "я",
    "о" : "ё",
    "э" : "е",
    "у" : "ю",
    "ы" : "и",
    "А" : "Я",
    "О" : "Ё",
    "Э" : "Е",
    "У" : "Ю",
    "Ы" : "И",
    "ъ" : "ь",
    "Ъ" : "Ь",
};

const Consonats = new Set();

const Vowels = new Set();

function InitializeConsonants() {
    Consonats.add('ц');
    Consonats.add('к');
    Consonats.add('н');
    Consonats.add('г');
    Consonats.add('ш');
    Consonats.add('з');
    Consonats.add('х');
    Consonats.add('ф');
    Consonats.add('в');
    Consonats.add('п');
    Consonats.add('р');
    Consonats.add('л');
    Consonats.add('д');
    Consonats.add('ж');
    Consonats.add('с');
    Consonats.add('м');
    Consonats.add('т');
    Consonats.add('б');
}
function InitializeVowels() {
    Vowels.add('а');
    Vowels.add('и');
    Vowels.add('у');
    Vowels.add('э');
    Vowels.add('о');
    Vowels.add('я');
    Vowels.add('ы');
    Vowels.add('ю');
    Vowels.add('е');
    Vowels.add('ё');
    Vowels.add('ь');
}

InitializeConsonants();
InitializeVowels();


function Nya() {
    let text = document.getElementById("inputArea").value;
    let level = document.getElementById("selectNyaLevel").value;
    
    document.getElementById("outputArea").value = TransformText(text, level);
}


function TransformText(text, level) {
    const transformers = transformers_map[level];
    for (const transformer of transformers) {
        text = transformer(text);
    }
    return text;
}

function debugTransformer(text) {
    return text + '1';
}

function NyaTransform(text) {

    let result_text = "";
    for (let i = 0; i < text.length; i++) {
        result_text += text[i];
        if (i == text.length - 1) {
            break;
        }

        if (text[i].toLowerCase() == 'н' && (text[i + 1] in YaMap)) {
            while (i + 1 < text.length && (text[i + 1] in YaMap)) {
                result_text += YaMap[text[i + 1]];
                i++;
            }
        }
    }
    return result_text;
}

function MyaTransform(text) {
    let result_text = "";
    for (let i = 0; i < text.length; i++) {
        result_text += text[i];
        if (i == text.length - 1) {

            break;
        }

        if (text[i].toLowerCase() == 'м' && (text[i + 1] in YaMap)) {
            while (i + 1 < text.length && (text[i + 1] in YaMap)) {
                result_text += YaMap[text[i + 1]];
                i++;
            }
        }
    }
    return result_text;
}

function YaTransform(text) {
    let result_text = "";
    for (let i = 0; i < text.length; i++) {
        result_text += text[i];
        if (i == text.length - 1) {

            break;
        }

        if (Consonats.has(text[i].toLowerCase()) && (text[i + 1] in YaMap)) {
            while (i + 1 < text.length && (text[i + 1] in YaMap)) {
                result_text += YaMap[text[i + 1]];
                i++;
            }
        }
    }
    return result_text;
}

function VowelsTransform(text) {
    let result_text = "";
    for (let i = 0; i < text.length; i++) {
        result_text += text[i];
        if (i == text.length - 1) {

            break;
        }

        if (Consonats.has(text[i].toLowerCase()) && (text[i + 1] in VowelsMap)) {
            while (i + 1 < text.length && (text[i + 1] in VowelsMap)) {
                result_text += VowelsMap[text[i + 1]];
                i++;
            }
        }
    }
    return result_text;
}

function ConsonatsTransform(text) {
    let result_text = "";
    for (let i = 0; i < text.length; i++) {
        result_text += text[i];
        if (Consonats.has(text[i]) && (i == text.length - 1 || !Vowels.has(text[i + 1]))) {
            result_text += 'ь';
        }
    }
    return result_text;
}
