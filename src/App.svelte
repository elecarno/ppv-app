<script>
import output_txt from "../output/parsed.txt?raw"
import output_json from "../output/parsed.json?raw"

// let parsed_json = JSON.parse(output_json)
// console.log(parsed_json)

import PdfViewer from 'svelte-pdf';
import PdfQuestionViewer from "./lib/PdfQuestionViewer.svelte"
import PdfMIViewer from "./lib/PdfMIViewer.svelte"
</script>

<main>
  <div class="question-viewer">
    <PdfQuestionViewer url="../sqa_pdfs/NH_Graphic-Communication_QP_2023.pdf" />
  </div>
  <div class="mi-viewer">
    <PdfMIViewer url="../sqa_pdfs/mi_NH_Graphic-Communication_mi_2023.pdf" />
  </div>
  

</main>

<style>
  .question-viewer {
    width: 52%;
    float: left;
  }
  .mi-viewer {
    width: 47%;
    float: right;
  }
</style>
