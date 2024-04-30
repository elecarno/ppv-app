<script>
import output_txt from "../output/parsed.txt?raw"
import output_json from "../output/parsed.json?raw"

// let parsed_json = JSON.parse(output_json)
// console.log(parsed_json)

import PdfViewer from 'svelte-pdf';
import PdfQuestionViewer from "./lib/PdfQuestionViewer.svelte"
import PdfMIViewer from "./lib/PdfMIViewer.svelte"
import PdfViewer2 from "./lib/PdfViewer2.svelte";
import PdfViewer3 from "./lib/PDFViewer3.svelte";
import PdfViewer4 from "./lib/PDFViewer4.svelte";
</script>

<main>
  <PdfViewer4/>
</main>

<style>

</style>
