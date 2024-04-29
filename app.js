import fs from "fs";
import PDFParser from "pdf2json";

const pdfParser = new PDFParser(this,1);

const output_path_txt = "/0_projects/programming_projects/sqa_viewer/output/parsed.txt"
const output_path_json = "/0_projects/programming_projects/sqa_viewer/output/parsed.json"
const load_path = "/0_projects/programming_projects/sqa_viewer/sqa_pdfs/nq-2024-exam-timetable.pdf"

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFile(output_path_txt, pdfParser.getRawTextContent(), ()=>{console.log("Successfully converted to TXT.");});
    fs.writeFile(output_path_json, JSON.stringify(pdfData, null, "\t"),(data) => {console.log("Successfully converted to JSON.");});
});

pdfParser.loadPDF(load_path);


// "/0_projects/programming_projects/sqa_viewer/output/parsed.json"
// "/0_projects/programming_projects/sqa_viewer/sqa_pdfs/orwell_first_draft.pdf"
// "/0_projects/programming_projects/sqa_viewer/sqa_pdfs/nq-2024-exam-timetable.pdf"