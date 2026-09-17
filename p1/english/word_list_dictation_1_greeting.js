const wordListName = 'P1 Dictation 1';

const wordList = [
  "Good", 
  "morning", 
  "afternoon", 
  "Goodbye", 
  "a", 
  "principal", 
  "teacher", 
  "monitor", 
  "classmate", 
  "What", 
  "is", 
  "your", 
  "name", 
  "My", 
  "Fred", 
  "Can", 
  "you", 
  "spell", 
  "please", 
  "How", 
  "old", 
  "are", 
  "I", 
  "am", 
  "six", 
  "years", 
  "five", 
  "seven", 
  "Hello", 
  "Hi", 
  "Lucy", 
  "James", 
  "Ivy", 
  "Evan", 
  "friends"
];

const sentenceList = [
  "Good morning.", 
  "Good afternoon.", 
  "Goodbye.", 
  "a principal", 
  "a teacher", 
  "a monitor", 
  "a classmate", 
  "What is your name?", 
  "My name is Fred.", 
  "Can you spell your name, please?", 
  "How old are you?", 
  "I am six years old.", 
  "five", 
  "six", 
  "seven", 
  "Hello!", 
  "Hi!", 
  "How are you?", 
  "Lucy", 
  "James", 
  "Ivy", 
  "Evan", 
  "friends", 
]


const sections = [

  {
      title: "👋 Greetings",
      items: [
        { sentence:"Good morning.", words:[{ text:"Good", chunks:[{text:"g"},{text:"oo",type:"vowel-team"},{text:"d"}] },{ text:"morning", chunks:[{text:"m"},{text:"or",type:"vowel-team"},{text:"n"},{text:"ing",type:"suffix"}] }] },
        { sentence:"Good afternoon.", words:[{ text:"Good", chunks:[{text:"g"},{text:"oo",type:"vowel-team"},{text:"d"}] },{ text:"afternoon", chunks:[{text:"a",type:"short-vowel"},{text:"f"},{text:"t"},{text:"e",type:"short-vowel"},{text:"r"},{text:"n"},{text:"oo",type:"vowel-team"},{text:"n"}] }] },
        { sentence:"Goodbye.", words:[{ text:"Goodbye", chunks:[{text:"g"},{text:"oo",type:"vowel-team"},{text:"d"},{text:"b"},{text:"y"},{text:"e",type:"short-vowel"}] }] },
        { sentence:"principal", words:[{ text:"principal", chunks:[{text:"pr",type:"blend"},{text:"i",type:"short-vowel"},{text:"n"},{text:"c"},{text:"i",type:"short-vowel"},{text:"p"},{text:"a",type:"short-vowel"},{text:"l"}] }] },
        { sentence:"teacher", words:[{ text:"teacher", chunks:[{text:"t"},{text:"ea",type:"vowel-team"},{text:"ch",type:"digraph"},{text:"er"}] }] },
        { sentence:"monitor", words:[{ text:"monitor", chunks:[{text:"m"},{text:"o",type:"short-vowel"},{text:"n"},{text:"i",type:"short-vowel"},{text:"t"},{text:"or",type:"vowel-team"}] }] },
        { sentence:"classmate", words:[{ text:"classmate", chunks:[{text:"cl",type:"blend"},{text:"a",type:"short-vowel"},{text:"ss",type:"digraph"},{text:"m"},{text:"a",type:"magic",group:"mate1",label:"a_e"},{text:"t"},{text:"e",type:"magic",group:"mate1",label:"a_e",silent:true}] }] },
        ]}, 
      {
        title: "What is your name",
        items: [
          { sentence:"What is your name?", words:[{ text:"What", chunks:[{text:"wh",type:"digraph"},{text:"a"},{text:"t"}] },{ text:"is", chunks:[{text:"i"},{text:"s"}] },{ text:"your", chunks:[{text:"y"},{text:"ou",type:"vowel-team"},{text:"r"}] },{ text:"name", chunks:[{text:"n"},{text:"a",type:"magic",group:"name1",label:"a_e"},{text:"m"},{text:"e",type:"magic",group:"name1",label:"a_e",silent:true}] }] },
          { sentence:"My name is Fred.", words:[{ text:"My", chunks:[{text:"m"},{text:"y"}] },{ text:"name", chunks:[{text:"n"},{text:"a",type:"magic",group:"name2",label:"a_e"},{text:"m"},{text:"e",type:"magic",group:"name2",label:"a_e",silent:true}] },{ text:"is", chunks:[{text:"i"},{text:"s"}] },{ text:"Fred", chunks:[{text:"F"},{text:"r"},{text:"e"},{text:"d"}] }] },
          { sentence:"Can you spell your name, please?", words:[{ text:"Can", chunks:[{text:"c"},{text:"a"},{text:"n"}] },{ text:"you", chunks:[{text:"y"},{text:"ou",type:"vowel-team"}] },{ text:"spell", chunks:[{text:"s"},{text:"p"},{text:"e"},{text:"ll"}] },{ text:"your", chunks:[{text:"y"},{text:"ou",type:"vowel-team"},{text:"r"}] },{ text:"name", chunks:[{text:"n"},{text:"a",type:"magic",group:"name3",label:"a_e"},{text:"m"},{text:"e",type:"magic",group:"name3",label:"a_e",silent:true}] },{ text:"please", chunks:[{text:"p"},{text:"l",type:"blend"},{text:"ea",type:"vowel-team"},{text:"s"},{text:"e"}] }] },
        ]}, 
      {
        title: "How old are you?",
        items: [
          { sentence:"How old are you?", words:[{ text:"How", chunks:[{text:"h"},{text:"ow",type:"vowel-team"}] },{ text:"old", chunks:[{text:"o",type:"short-vowel"},{text:"ld",type:"blend"}] },{ text:"are", chunks:[{text:"a",type:"short-vowel"},{text:"r"},{text:"e"}] },{ text:"you", chunks:[{text:"y"},{text:"ou",type:"vowel-team"}] }] },
          { sentence:"I am six years old.", words:[{ text:"I", chunks:[{text:"I"}] },{ text:"am", chunks:[{text:"a",type:"short-vowel"},{text:"m"}] },{ text:"six", chunks:[{text:"s"},{text:"i",type:"short-vowel"},{text:"x"}] },{ text:"years", chunks:[{text:"y"},{text:"ea",type:"vowel-team"},{text:"r"},{text:"s"}] },{ text:"old", chunks:[{text:"o",type:"short-vowel"},{text:"ld",type:"blend"}] }] },
          { sentence:"five", words:[{ text:"five", chunks:[{text:"f"},{text:"i",type:"magic",group:"five1",label:"i_e"},{text:"v"},{text:"e",type:"magic",group:"five1",label:"i_e",silent:true}] }] },
          { sentence:"six", words:[{ text:"six", chunks:[{text:"s"},{text:"i",type:"short-vowel"},{text:"x"}] }] },
          { sentence:"seven", words:[{ text:"seven", chunks:[{text:"s"},{text:"e",type:"short-vowel"},{text:"v"},{text:"e",type:"short-vowel"},{text:"n"}] }] },
        ]}, 
      {
        title: "Others",
        items: [
          { sentence:"Hello!", words:[{ text:"Hello", chunks:[{text:"h"},{text:"e",type:"short-vowel"},{text:"ll"},{text:"o",type:"short-vowel"}] }] },
          { sentence:"Hi!", words:[{ text:"Hi", chunks:[{text:"h"},{text:"i"}] }] },
          { sentence:"How are you?", words:[{ text:"How", chunks:[{text:"h"},{text:"ow",type:"vowel-team"}] },{ text:"are", chunks:[{text:"a",type:"short-vowel"},{text:"r"},{text:"e"}] },{ text:"you", chunks:[{text:"y"},{text:"ou",type:"vowel-team"}] }] },
          { sentence:"Lucy", words:[{ text:"Lucy", chunks:[{text:"L"},{text:"u",type:"short-vowel"},{text:"c"},{text:"y"}] }] },
          { sentence:"James", words:[{ text:"James", chunks:[{text:"J"},{text:"a",type:"magic",group:"james1",label:"a_e"},{text:"m"},{text:"e",type:"magic",group:"james1",label:"a_e",silent:true},{text:"s"}] }] },
          { sentence:"Ivy", words:[{ text:"Ivy", chunks:[{text:"I"},{text:"v"},{text:"y"}] }] },
          { sentence:"Evan", words:[{ text:"Evan", chunks:[{text:"E"},{text:"v"},{text:"a",type:"short-vowel"},{text:"n"}] }] },
          { sentence:"friends", words:[{ text:"friends", chunks:[{text:"f"},{text:"r"},{text:"ie",type:"vowel-team"},{text:"n"},{text:"d"},{text:"s"}] }] }
        ]
      }
  ];
  

function computeQuestionFromIndexAndWord(currentIndex, currentWord) {
  return null;
}