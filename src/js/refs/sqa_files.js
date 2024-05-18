var sqaFiles = {}

// var sqaFiles = {
//     "art": {
//         "n5": {
//             "2018": [
//                 {
//                     "name": "art_n5_2018_qp",
//                     "path": "./sqa_pdfs\\art\\n5\\2018\\art_n5_2018_qp.pdf",
//                     "mi": {
//                         "name": "art_n5_2018_qp_mi",
//                         "path": "./sqa_pdfs\\art\\n5\\2018\\art_n5_2018_qp_mi.pdf"
//                     }
//                 }
//             ],
//             "2019": [
//                 {
//                     "name": "art_n5_2019_qp",
//                     "path": "./sqa_pdfs\\art\\n5\\2019\\art_n5_2019_qp.pdf",
//                     "mi": {
//                         "name": "art_n5_2019_qp_mi",
//                         "path": "./sqa_pdfs\\art\\n5\\2019\\art_n5_2019_qp_mi.pdf"
//                     }
//                 }
//             ],
//             "2022": [
//                 {
//                     "name": "art_n5_2022_qp",
//                     "path": "./sqa_pdfs\\art\\n5\\2022\\art_n5_2022_qp.pdf",
//                     "mi": {
//                         "name": "art_n5_2022_qp_mi",
//                         "path": "./sqa_pdfs\\art\\n5\\2022\\art_n5_2022_qp_mi.pdf"
//                     }
//                 }
//             ],
//             "2023": [
//                 {
//                     "name": "art_n5_2023_qp",
//                     "path": "./sqa_pdfs\\art\\n5\\2023\\art_n5_2023_qp.pdf",
//                     "mi": {
//                         "name": "art_n5_2023_qp_mi",
//                         "path": "./sqa_pdfs\\art\\n5\\2023\\art_n5_2023_qp_mi.pdf"
//                     }
//                 }
//             ]
//         },
//         "nh": {
//             "2018": [
//                 {
//                     "name": "art_nh_2018_qp",
//                     "path": "./sqa_pdfs\\art\\nh\\2018\\art_nh_2018_qp.pdf",
//                     "mi": {
//                         "name": "art_nh_2018_qp_mi",
//                         "path": "./sqa_pdfs\\art\\nh\\2018\\art_nh_2018_qp_mi.pdf"
//                     }
//                 }
//             ],
//             "2019": [
//                 {
//                     "name": "art_nh_2019_qp",
//                     "path": "./sqa_pdfs\\art\\nh\\2019\\art_nh_2019_qp.pdf",
//                     "mi": {
//                         "name": "art_nh_2019_qp_mi",
//                         "path": "./sqa_pdfs\\art\\nh\\2019\\art_nh_2019_qp_mi.pdf"
//                     }
//                 }
//             ],
//             "2022": [
//                 {
//                     "name": "art_nh_2022_qp",
//                     "path": "./sqa_pdfs\\art\\nh\\2022\\art_nh_2022_qp.pdf",
//                     "mi": {
//                         "name": "art_nh_2022_qp_mi",
//                         "path": "./sqa_pdfs\\art\\nh\\2022\\art_nh_2022_qp_mi.pdf"
//                     }
//                 }
//             ],
//             "2023": [
//                 {
//                     "name": "art_nh_2023_qp",
//                     "path": "./sqa_pdfs\\art\\nh\\2023\\art_nh_2023_qp.pdf",
//                     "mi": {
//                         "name": "art_nh_2023_qp_mi",
//                         "path": "./sqa_pdfs\\art\\nh\\2023\\art_nh_2023_qp_mi.pdf"
//                     }
//                 }
//             ]
//         }
//     },
//     "bio": {
//         "ah": {
//             "2018": [
//                 {
//                     "name": "bio_ah_2018_all",
//                     "path": "./sqa_pdfs\\bio\\ah\\2018\\bio_ah_2018_all.pdf",
//                     "mi": {
//                         "name": "bio_ah_2018_all_mi",
//                         "path": "./sqa_pdfs\\bio\\ah\\2018\\bio_ah_2018_all_mi.pdf"
//                     }
//                 }
//             ],
//             "2019": [
//                 {
//                     "name": "bio_ah_2019_all",
//                     "path": "./sqa_pdfs\\bio\\ah\\2019\\bio_ah_2019_all.pdf",
//                     "mi": {
//                         "name": "bio_ah_2019_all_mi",
//                         "path": "./sqa_pdfs\\bio\\ah\\2019\\bio_ah_2019_all_mi.pdf"
//                     }
//                 }
//             ],
//             "2022": [
//                 {
//                     "name": "bio_ah_2022_s1",
//                     "path": "./sqa_pdfs\\bio\\ah\\2022\\bio_ah_2022_s1.pdf",
//                     "mi": {
//                         "name": "bio_ah_2022_s1_mi",
//                         "path": "./sqa_pdfs\\bio\\ah\\2022\\bio_ah_2022_s1_mi.pdf"
//                     }
//                 },
//                 {
//                     "name": "bio_ah_2022_s2",
//                     "path": "./sqa_pdfs\\bio\\ah\\2022\\bio_ah_2022_s2.pdf",
//                     "mi": {
//                         "name": "bio_ah_2022_s2_mi",
//                         "path": "./sqa_pdfs\\bio\\ah\\2022\\bio_ah_2022_s2_mi.pdf"
//                     }
//                 }
//             ],
//             "2023": [
//                 {
//                     "name": "bio_ah_2023_s1",
//                     "path": "./sqa_pdfs\\bio\\ah\\2023\\bio_ah_2023_s1.pdf",
//                     "mi": {
//                         "name": "bio_ah_2023_s1_mi",
//                         "path": "./sqa_pdfs\\bio\\ah\\2023\\bio_ah_2023_s1_mi.pdf"
//                     }
//                 },
//                 {
//                     "name": "bio_ah_2023_s2",
//                     "path": "./sqa_pdfs\\bio\\ah\\2023\\bio_ah_2023_s2.pdf",
//                     "mi": {
//                         "name": "bio_ah_2023_s2_mi",
//                         "path": "./sqa_pdfs\\bio\\ah\\2023\\bio_ah_2023_s2_mi.pdf"
//                     }
//                 }
//             ]
//         },
//         "n5": {
//             "2018": [
//                 {
//                     "name": "bio_n5_2018_all",
//                     "path": "./sqa_pdfs\\bio\\n5\\2018\\bio_n5_2018_all.pdf",
//                     "mi": {
//                         "name": "bio_n5_2018_all_mi",
//                         "path": "./sqa_pdfs\\bio\\n5\\2018\\bio_n5_2018_all_mi.pdf"
//                     }
//                 }
//             ],
//             "2019": [
//                 {
//                     "name": "bio_n5_2019_all",
//                     "path": "./sqa_pdfs\\bio\\n5\\2019\\bio_n5_2019_all.pdf",
//                     "mi": {
//                         "name": "bio_n5_2019_all_mi",
//                         "path": "./sqa_pdfs\\bio\\n5\\2019\\bio_n5_2019_all_mi.pdf"
//                     }
//                 }
//             ],
//             "2022": [
//                 {
//                     "name": "bio_n5_2022_s1",
//                     "path": "./sqa_pdfs\\bio\\n5\\2022\\bio_n5_2022_s1.pdf",
//                     "mi": {
//                         "name": "bio_n5_2022_s1_mi",
//                         "path": "./sqa_pdfs\\bio\\n5\\2022\\bio_n5_2022_s1_mi.pdf"
//                     }
//                 },
//                 {
//                     "name": "bio_n5_2022_s2",
//                     "path": "./sqa_pdfs\\bio\\n5\\2022\\bio_n5_2022_s2.pdf",
//                     "mi": {
//                         "name": "bio_n5_2022_s2_mi",
//                         "path": "./sqa_pdfs\\bio\\n5\\2022\\bio_n5_2022_s2_mi.pdf"
//                     }
//                 }
//             ],
//             "2023": [
//                 {
//                     "name": "bio_n5_2023_s1",
//                     "path": "./sqa_pdfs\\bio\\n5\\2023\\bio_n5_2023_s1.pdf",
//                     "mi": {
//                         "name": "bio_n5_2023_s1_mi",
//                         "path": "./sqa_pdfs\\bio\\n5\\2023\\bio_n5_2023_s1_mi.pdf"
//                     }
//                 },
//                 {
//                     "name": "bio_n5_2023_s2",
//                     "path": "./sqa_pdfs\\bio\\n5\\2023\\bio_n5_2023_s2.pdf",
//                     "mi": {
//                         "name": "bio_n5_2023_s2_mi",
//                         "path": "./sqa_pdfs\\bio\\n5\\2023\\bio_n5_2023_s2_mi.pdf"
//                     }
//                 }
//             ]
//         },
//         "nh": {
//             "2018": [
//                 {
//                     "name": "bio_nh_2018_all",
//                     "path": "./sqa_pdfs\\bio\\nh\\2018\\bio_nh_2018_all.pdf",
//                     "mi": {
//                         "name": "bio_nh_2018_all_mi",
//                         "path": "./sqa_pdfs\\bio\\nh\\2018\\bio_nh_2018_all_mi.pdf"
//                     }
//                 }
//             ],
//             "2019": [
//                 {
//                     "name": "bio_nh_2019_all",
//                     "path": "./sqa_pdfs\\bio\\nh\\2019\\bio_nh_2019_all.pdf",
//                     "mi": {
//                         "name": "bio_nh_2019_all_mi",
//                         "path": "./sqa_pdfs\\bio\\nh\\2019\\bio_nh_2019_all_mi.pdf"
//                     }
//                 }
//             ],
//             "2022": [
//                 {
//                     "name": "bio_nh_2022_p1",
//                     "path": "./sqa_pdfs\\bio\\nh\\2022\\bio_nh_2022_p1.pdf",
//                     "mi": {
//                         "name": "bio_nh_2022_p1_mi",
//                         "path": "./sqa_pdfs\\bio\\nh\\2022\\bio_nh_2022_p1_mi.pdf"
//                     }
//                 },
//                 {
//                     "name": "bio_nh_2022_p2",
//                     "path": "./sqa_pdfs\\bio\\nh\\2022\\bio_nh_2022_p2.pdf",
//                     "mi": {
//                         "name": "bio_nh_2022_p2_mi",
//                         "path": "./sqa_pdfs\\bio\\nh\\2022\\bio_nh_2022_p2_mi.pdf"
//                     }
//                 }
//             ],
//             "2023": [
//                 {
//                     "name": "bio_nh_2023_p1",
//                     "path": "./sqa_pdfs\\bio\\nh\\2023\\bio_nh_2023_p1.pdf",
//                     "mi": {
//                         "name": "bio_nh_2023_p1_mi",
//                         "path": "./sqa_pdfs\\bio\\nh\\2023\\bio_nh_2023_p1_mi.pdf"
//                     }
//                 },
//                 {
//                     "name": "bio_nh_2023_p2",
//                     "path": "./sqa_pdfs\\bio\\nh\\2023\\bio_nh_2023_p2.pdf",
//                     "mi": {
//                         "name": "bio_nh_2023_p2_mi",
//                         "path": "./sqa_pdfs\\bio\\nh\\2023\\bio_nh_2023_p2_mi.pdf"
//                     }
//                 }
//             ]
//         }
//     },
//     "bus": {
//         "n5": {
//             "2018": [
//                 {
//                     "name": "bus_n5_2018_qp",
//                     "path": "./sqa_pdfs\\bus\\n5\\2018\\bus_n5_2018_qp.pdf",
//                     "mi": {
//                         "name": "bus_n5_2018_qp_mi",
//                         "path": "./sqa_pdfs\\bus\\n5\\2018\\bus_n5_2018_qp_mi.pdf"
//                     }
//                 }
//             ],
//             "2019": [
//                 {
//                     "name": "bus_n5_2019_qp",
//                     "path": "./sqa_pdfs\\bus\\n5\\2019\\bus_n5_2019_qp.pdf",
//                     "mi": {
//                         "name": "bus_n5_2019_qp_mi",
//                         "path": "./sqa_pdfs\\bus\\n5\\2019\\bus_n5_2019_qp_mi.pdf"
//                     }
//                 }
//             ],
//             "2021": [
//                 {
//                     "name": "bus_n5_2021_qp",
//                     "path": "./sqa_pdfs\\bus\\n5\\2021\\bus_n5_2021_qp.pdf",
//                     "mi": {
//                         "name": "bus_n5_2021_qp_mi",
//                         "path": "./sqa_pdfs\\bus\\n5\\2021\\bus_n5_2021_qp_mi.pdf"
//                     }
//                 }
//             ],
//             "2022": [
//                 {
//                     "name": "bus_n5_2022_qp",
//                     "path": "./sqa_pdfs\\bus\\n5\\2022\\bus_n5_2022_qp.pdf",
//                     "mi": {
//                         "name": "bus_n5_2022_qp_mi",
//                         "path": "./sqa_pdfs\\bus\\n5\\2022\\bus_n5_2022_qp_mi.pdf"
//                     }
//                 }
//             ],
//             "2023": [
//                 {
//                     "name": "bus_n5_2023_qp",
//                     "path": "./sqa_pdfs\\bus\\n5\\2023\\bus_n5_2023_qp.pdf",
//                     "mi": {
//                         "name": "bus_n5_2023_qp_mi",
//                         "path": "./sqa_pdfs\\bus\\n5\\2023\\bus_n5_2023_qp_mi.pdf"
//                     }
//                 }
//             ]
//         },
//         "nh": {
//             "2018": [
//                 {
//                     "name": "bus_nh_2018_qp",
//                     "path": "./sqa_pdfs\\bus\\nh\\2018\\bus_nh_2018_qp.pdf",
//                     "mi": {
//                         "name": "bus_nh_2018_qp_mi",
//                         "path": "./sqa_pdfs\\bus\\nh\\2018\\bus_nh_2018_qp_mi.pdf"
//                     }
//                 }
//             ],
//             "2019": [
//                 {
//                     "name": "bus_nh_2019_qp",
//                     "path": "./sqa_pdfs\\bus\\nh\\2019\\bus_nh_2019_qp.pdf",
//                     "mi": {
//                         "name": "bus_nh_2019_qp_mi",
//                         "path": "./sqa_pdfs\\bus\\nh\\2019\\bus_nh_2019_qp_mi.pdf"
//                     }
//                 }
//             ],
//             "2022": [
//                 {
//                     "name": "bus_nh_2022_qp",
//                     "path": "./sqa_pdfs\\bus\\nh\\2022\\bus_nh_2022_qp.pdf",
//                     "mi": {
//                         "name": "bus_nh_2022_qp_mi",
//                         "path": "./sqa_pdfs\\bus\\nh\\2022\\bus_nh_2022_qp_mi.pdf"
//                     }
//                 }
//             ],
//             "2023": [
//                 {
//                     "name": "bus_nh_2023_qp",
//                     "path": "./sqa_pdfs\\bus\\nh\\2023\\bus_nh_2023_qp.pdf",
//                     "mi": {
//                         "name": "bus_nh_2023_qp_mi",
//                         "path": "./sqa_pdfs\\bus\\nh\\2023\\bus_nh_2023_qp_mi.pdf"
//                     }
//                 }
//             ]
//         }
//     },
//     "chem": {
//         "ah": {
//             "2018": [
//                 {
//                     "name": "chem_ah_2018_all",
//                     "path": "./sqa_pdfs\\chem\\ah\\2018\\chem_ah_2018_all.PDF",
//                     "mi": {
//                         "name": "chem_ah_2018_all_mi",
//                         "path": "./sqa_pdfs\\chem\\ah\\2018\\chem_ah_2018_all_mi.pdf"
//                     }
//                 }
//             ],
//             "2019": [
//                 {
//                     "name": "chem_ah_2019_all",
//                     "path": "./sqa_pdfs\\chem\\ah\\2019\\chem_ah_2019_all.PDF",
//                     "mi": {
//                         "name": "chem_ah_2019_all_mi",
//                         "path": "./sqa_pdfs\\chem\\ah\\2019\\chem_ah_2019_all_mi.pdf"
//                     }
//                 }
//             ],
//             "2022": [
//                 {
//                     "name": "chem_ah_2022_s1",
//                     "path": "./sqa_pdfs\\chem\\ah\\2022\\chem_ah_2022_s1.PDF",
//                     "mi": {
//                         "name": "chem_ah_2022_s1_mi",
//                         "path": "./sqa_pdfs\\chem\\ah\\2022\\chem_ah_2022_s1_mi.pdf"
//                     }
//                 },
//                 {
//                     "name": "chem_ah_2022_s2",
//                     "path": "./sqa_pdfs\\chem\\ah\\2022\\chem_ah_2022_s2.PDF",
//                     "mi": {
//                         "name": "chem_ah_2022_s2_mi",
//                         "path": "./sqa_pdfs\\chem\\ah\\2022\\chem_ah_2022_s2_mi.pdf"
//                     }
//                 }
//             ],
//             "2023": [
//                 {
//                     "name": "chem_ah_2023_s1",
//                     "path": "./sqa_pdfs\\chem\\ah\\2023\\chem_ah_2023_s1.PDF",
//                     "mi": {
//                         "name": "chem_ah_2023_s1_mi",
//                         "path": "./sqa_pdfs\\chem\\ah\\2023\\chem_ah_2023_s1_mi.pdf"
//                     }
//                 },
//                 {
//                     "name": "chem_ah_2023_s2",
//                     "path": "./sqa_pdfs\\chem\\ah\\2023\\chem_ah_2023_s2.PDF",
//                     "mi": {
//                         "name": "chem_ah_2023_s2_mi",
//                         "path": "./sqa_pdfs\\chem\\ah\\2023\\chem_ah_2023_s2_mi.pdf"
//                     }
//                 }
//             ]
//         },
//         "n5": {
//             "2018": [
//                 {
//                     "name": "chem_n5_2018_all",
//                     "path": "./sqa_pdfs\\chem\\n5\\2018\\chem_n5_2018_all.pdf",
//                     "mi": {
//                         "name": "chem_n5_2018_all_mi",
//                         "path": "./sqa_pdfs\\chem\\n5\\2018\\chem_n5_2018_all_mi.pdf"
//                     }
//                 }
//             ],
//             "2019": [
//                 {
//                     "name": "chem_n5_2019_all",
//                     "path": "./sqa_pdfs\\chem\\n5\\2019\\chem_n5_2019_all.pdf",
//                     "mi": {
//                         "name": "chem_n5_2019_all_mi",
//                         "path": "./sqa_pdfs\\chem\\n5\\2019\\chem_n5_2019_all_mi.pdf"
//                     }
//                 }
//             ],
//             "2022": [
//                 {
//                     "name": "chem_n5_2022_s1",
//                     "path": "./sqa_pdfs\\chem\\n5\\2022\\chem_n5_2022_s1.pdf",
//                     "mi": {
//                         "name": "chem_n5_2022_s1_mi",
//                         "path": "./sqa_pdfs\\chem\\n5\\2022\\chem_n5_2022_s1_mi.pdf"
//                     }
//                 },
//                 {
//                     "name": "chem_n5_2022_s2",
//                     "path": "./sqa_pdfs\\chem\\n5\\2022\\chem_n5_2022_s2.pdf",
//                     "mi": {
//                         "name": "chem_n5_2022_s2_mi",
//                         "path": "./sqa_pdfs\\chem\\n5\\2022\\chem_n5_2022_s2_mi.pdf"
//                     }
//                 }
//             ],
//             "2023": [
//                 {
//                     "name": "chem_n5_2023_s1",
//                     "path": "./sqa_pdfs\\chem\\n5\\2023\\chem_n5_2023_s1.pdf",
//                     "mi": {
//                         "name": "chem_n5_2023_s1_mi",
//                         "path": "./sqa_pdfs\\chem\\n5\\2023\\chem_n5_2023_s1_mi.pdf"
//                     }
//                 },
//                 {
//                     "name": "chem_n5_2023_s2",
//                     "path": "./sqa_pdfs\\chem\\n5\\2023\\chem_n5_2023_s2.pdf",
//                     "mi": {
//                         "name": "chem_n5_2023_s2_mi",
//                         "path": "./sqa_pdfs\\chem\\n5\\2023\\chem_n5_2023_s2_mi.pdf"
//                     }
//                 }
//             ]
//         },
//         "nh": {
//             "2018": [
//                 {
//                     "name": "chem_nh_2018_all",
//                     "path": "./sqa_pdfs\\chem\\nh\\2018\\chem_nh_2018_all.PDF",
//                     "mi": {
//                         "name": "chem_nh_2018_all_mi",
//                         "path": "./sqa_pdfs\\chem\\nh\\2018\\chem_nh_2018_all_mi.pdf"
//                     }
//                 }
//             ],
//             "2019": [
//                 {
//                     "name": "chem_nh_2019_all",
//                     "path": "./sqa_pdfs\\chem\\nh\\2019\\chem_nh_2019_all.pdf",
//                     "mi": {
//                         "name": "chem_nh_2019_all_mi",
//                         "path": "./sqa_pdfs\\chem\\nh\\2019\\chem_nh_2019_all_mi.pdf"
//                     }
//                 }
//             ],
//             "2022": [
//                 {
//                     "name": "chem_nh_2022_p1",
//                     "path": "./sqa_pdfs\\chem\\nh\\2022\\chem_nh_2022_p1.pdf",
//                     "mi": {
//                         "name": "chem_nh_2022_p1_mi",
//                         "path": "./sqa_pdfs\\chem\\nh\\2022\\chem_nh_2022_p1_mi.pdf"
//                     }
//                 },
//                 {
//                     "name": "chem_nh_2022_p2",
//                     "path": "./sqa_pdfs\\chem\\nh\\2022\\chem_nh_2022_p2.pdf",
//                     "mi": {
//                         "name": "chem_nh_2022_p2_mi",
//                         "path": "./sqa_pdfs\\chem\\nh\\2022\\chem_nh_2022_p2_mi.pdf"
//                     }
//                 }
//             ],
//             "2023": [
//                 {
//                     "name": "chem_nh_2023_p1",
//                     "path": "./sqa_pdfs\\chem\\nh\\2023\\chem_nh_2023_p1.pdf",
//                     "mi": {
//                         "name": "chem_nh_2023_p1_mi",
//                         "path": "./sqa_pdfs\\chem\\nh\\2023\\chem_nh_2023_p1_mi.pdf"
//                     }
//                 },
//                 {
//                     "name": "chem_nh_2023_p2",
//                     "path": "./sqa_pdfs\\chem\\nh\\2023\\chem_nh_2023_p2.pdf",
//                     "mi": {
//                         "name": "chem_nh_2023_p2_mi",
//                         "path": "./sqa_pdfs\\chem\\nh\\2023\\chem_nh_2023_p2_mi.pdf"
//                     }
//                 }
//             ]
//         }
//     },
//     "eng": {
//         "n5": {
//             "2018": [
//                 {
//                     "name": "eng_n5_2018_all",
//                     "path": "./sqa_pdfs\\eng\\n5\\2018\\eng_n5_2018_all.pdf",
//                     "mi": {
//                         "name": "eng_n5_2018_all_mi",
//                         "path": "./sqa_pdfs\\eng\\n5\\2018\\eng_n5_2018_all_mi.pdf"
//                     }
//                 }
//             ],
//             "2019": [
//                 {
//                     "name": "eng_n5_2019_all",
//                     "path": "./sqa_pdfs\\eng\\n5\\2019\\eng_n5_2019_all.pdf",
//                     "mi": {
//                         "name": "eng_n5_2019_all_mi",
//                         "path": "./sqa_pdfs\\eng\\n5\\2019\\eng_n5_2019_all_mi.pdf"
//                     }
//                 }
//             ],
//             "2022": [
//                 {
//                     "name": "eng_n5_2022_qp",
//                     "path": "./sqa_pdfs\\eng\\n5\\2022\\eng_n5_2022_qp.pdf",
//                     "mi": {
//                         "name": "eng_n5_2022_qp_mi",
//                         "path": "./sqa_pdfs\\eng\\n5\\2022\\eng_n5_2022_qp_mi.pdf"
//                     }
//                 },
//                 {
//                     "name": "eng_n5_2022_ru",
//                     "path": "./sqa_pdfs\\eng\\n5\\2022\\eng_n5_2022_ru.pdf",
//                     "mi": {
//                         "name": "eng_n5_2022_ru_mi",
//                         "path": "./sqa_pdfs\\eng\\n5\\2022\\eng_n5_2022_ru_mi.pdf"
//                     }
//                 }
//             ],
//             "2023": [
//                 {
//                     "name": "eng_n5_2023_qp",
//                     "path": "./sqa_pdfs\\eng\\n5\\2023\\eng_n5_2023_qp.pdf",
//                     "mi": {
//                         "name": "eng_n5_2023_qp_mi",
//                         "path": "./sqa_pdfs\\eng\\n5\\2023\\eng_n5_2023_qp_mi.pdf"
//                     }
//                 },
//                 {
//                     "name": "eng_n5_2023_ru",
//                     "path": "./sqa_pdfs\\eng\\n5\\2023\\eng_n5_2023_ru.pdf",
//                     "mi": {
//                         "name": "eng_n5_2023_ru_mi",
//                         "path": "./sqa_pdfs\\eng\\n5\\2023\\eng_n5_2023_ru_mi.pdf"
//                     }
//                 }
//             ]
//         },
//         "nh": {
//             "2018": [
//                 {
//                     "name": "eng_nh_2018_all",
//                     "path": "./sqa_pdfs\\eng\\nh\\2018\\eng_nh_2018_all.PDF",
//                     "mi": {
//                         "name": "eng_nh_2018_all_mi",
//                         "path": "./sqa_pdfs\\eng\\nh\\2018\\eng_nh_2018_all_mi.PDF"
//                     }
//                 }
//             ],
//             "2019": [
//                 {
//                     "name": "eng_nh_2019_all",
//                     "path": "./sqa_pdfs\\eng\\nh\\2019\\eng_nh_2019_all.PDF",
//                     "mi": {
//                         "name": "eng_nh_2019_all_mi",
//                         "path": "./sqa_pdfs\\eng\\nh\\2019\\eng_nh_2019_all_mi.PDF"
//                     }
//                 }
//             ],
//             "2022": [
//                 {
//                     "name": "eng_nh_2022_cr",
//                     "path": "./sqa_pdfs\\eng\\nh\\2022\\eng_nh_2022_cr.PDF",
//                     "mi": {
//                         "name": "eng_nh_2022_cr_mi",
//                         "path": "./sqa_pdfs\\eng\\nh\\2022\\eng_nh_2022_cr_mi.PDF"
//                     }
//                 },
//                 {
//                     "name": "eng_nh_2022_ru",
//                     "path": "./sqa_pdfs\\eng\\nh\\2022\\eng_nh_2022_ru.pdf",
//                     "mi": {
//                         "name": "eng_nh_2022_ru_mi",
//                         "path": "./sqa_pdfs\\eng\\nh\\2022\\eng_nh_2022_ru_mi.pdf"
//                     },
//                     "sp": {
//                         "name": "eng_nh_2022_ru_sp",
//                         "path": "./sqa_pdfs\\eng\\nh\\2022\\eng_nh_2022_ru_sp.pdf"
//                     }
//                 }
//             ],
//             "2023": [
//                 {
//                     "name": "eng_nh_2023_cr",
//                     "path": "./sqa_pdfs\\eng\\nh\\2023\\eng_nh_2023_cr.PDF",
//                     "mi": {
//                         "name": "eng_nh_2023_cr_mi",
//                         "path": "./sqa_pdfs\\eng\\nh\\2023\\eng_nh_2023_cr_mi.PDF"
//                     }
//                 },
//                 {
//                     "name": "eng_nh_2023_ru",
//                     "path": "./sqa_pdfs\\eng\\nh\\2023\\eng_nh_2023_ru.pdf",
//                     "mi": {
//                         "name": "eng_nh_2023_ru_mi",
//                         "path": "./sqa_pdfs\\eng\\nh\\2023\\eng_nh_2023_ru_mi.pdf"
//                     },
//                     "sp": {
//                         "name": "eng_nh_2023_ru_sp",
//                         "path": "./sqa_pdfs\\eng\\nh\\2023\\eng_nh_2023_ru_sp.pdf"
//                     }
//                 }
//             ]
//         }
//     },
//     "fren": [],
//     "geo": [],
//     "ger": [],
//     "grc": {
//         "n5": {
//             "2018": [
//                 {
//                     "name": "grc_n5_2018_qp",
//                     "path": "./sqa_pdfs\\grc\\n5\\2018\\grc_n5_2018_qp.PDF",
//                     "mi": {
//                         "name": "grc_n5_2018_qp_mi",
//                         "path": "./sqa_pdfs\\grc\\n5\\2018\\grc_n5_2018_qp_mi.PDF"
//                     }
//                 }
//             ],
//             "2019": [
//                 {
//                     "name": "grc_n5_2019_qp",
//                     "path": "./sqa_pdfs\\grc\\n5\\2019\\grc_n5_2019_qp.PDF",
//                     "mi": {
//                         "name": "grc_n5_2019_qp_mi",
//                         "path": "./sqa_pdfs\\grc\\n5\\2019\\grc_n5_2019_qp_mi.PDF"
//                     }
//                 }
//             ],
//             "2022": [
//                 {
//                     "name": "grc_n5_2022_qp",
//                     "path": "./sqa_pdfs\\grc\\n5\\2022\\grc_n5_2022_qp.PDF",
//                     "mi": {
//                         "name": "grc_n5_2022_qp_mi",
//                         "path": "./sqa_pdfs\\grc\\n5\\2022\\grc_n5_2022_qp_mi.PDF"
//                     }
//                 }
//             ],
//             "2023": [
//                 {
//                     "name": "grc_n5_2023_qp",
//                     "path": "./sqa_pdfs\\grc\\n5\\2023\\grc_n5_2023_qp.PDF",
//                     "mi": {
//                         "name": "grc_n5_2023_qp_mi",
//                         "path": "./sqa_pdfs\\grc\\n5\\2023\\grc_n5_2023_qp_mi.PDF"
//                     },
//                     "sp": {
//                         "name": "grc_n5_2023_qp_sp",
//                         "path": "./sqa_pdfs\\grc\\n5\\2023\\grc_n5_2023_qp_sp.pdf"
//                     }
//                 }
//             ]
//         },
//         "nh": {
//             "2018": [
//                 {
//                     "name": "grc_nh_2018_all",
//                     "path": "./sqa_pdfs\\grc\\nh\\2018\\grc_nh_2018_all.PDF",
//                     "mi": {
//                         "name": "grc_nh_2018_all_mi",
//                         "path": "./sqa_pdfs\\grc\\nh\\2018\\grc_nh_2018_all_mi.PDF"
//                     }
//                 }
//             ],
//             "2019": [
//                 {
//                     "name": "grc_nh_2019_all",
//                     "path": "./sqa_pdfs\\grc\\nh\\2019\\grc_nh_2019_all.PDF",
//                     "mi": {
//                         "name": "grc_nh_2019_all_mi",
//                         "path": "./sqa_pdfs\\grc\\nh\\2019\\grc_nh_2019_all_mi.PDF"
//                     }
//                 }
//             ],
//             "2022": [
//                 {
//                     "name": "grc_nh_2022_qp",
//                     "path": "./sqa_pdfs\\grc\\nh\\2022\\grc_nh_2022_qp.PDF",
//                     "mi": {
//                         "name": "grc_nh_2022_qp_mi",
//                         "path": "./sqa_pdfs\\grc\\nh\\2022\\grc_nh_2022_qp_mi.PDF"
//                     },
//                     "sp": {
//                         "name": "grc_nh_2022_qp_sp",
//                         "path": "./sqa_pdfs\\grc\\nh\\2022\\grc_nh_2022_qp_sp.pdf"
//                     }
//                 }
//             ],
//             "2023": [
//                 {
//                     "name": "grc_nh_2023_qp",
//                     "path": "./sqa_pdfs\\grc\\nh\\2023\\grc_nh_2023_qp.PDF",
//                     "mi": {
//                         "name": "grc_nh_2023_qp_mi",
//                         "path": "./sqa_pdfs\\grc\\nh\\2023\\grc_nh_2023_qp_mi.PDF"
//                     },
//                     "sp": {
//                         "name": "grc_nh_2023_qp_sp",
//                         "path": "./sqa_pdfs\\grc\\nh\\2023\\grc_nh_2023_qp_sp.pdf"
//                     }
//                 }
//             ]
//         }
//     },
//     "his": [],
//     "math": {
//         "ah": {
//             "2018": [
//                 {
//                     "name": "math_ah_2018_qp",
//                     "path": "./sqa_pdfs\\math\\ah\\2018\\math_ah_2018_qp.pdf",
//                     "mi": {
//                         "name": "math_ah_2018_qp_mi",
//                         "path": "./sqa_pdfs\\math\\ah\\2018\\math_ah_2018_qp_mi.pdf"
//                     }
//                 }
//             ],
//             "2019": [
//                 {
//                     "name": "math_ah_2019_qp",
//                     "path": "./sqa_pdfs\\math\\ah\\2019\\math_ah_2019_qp.pdf",
//                     "mi": {
//                         "name": "math_ah_2019_qp_mi",
//                         "path": "./sqa_pdfs\\math\\ah\\2019\\math_ah_2019_qp_mi.pdf"
//                     }
//                 }
//             ],
//             "2022": [
//                 {
//                     "name": "math_ah_2022_p1",
//                     "path": "./sqa_pdfs\\math\\ah\\2022\\math_ah_2022_p1.pdf",
//                     "mi": {
//                         "name": "math_ah_2022_p1_mi",
//                         "path": "./sqa_pdfs\\math\\ah\\2022\\math_ah_2022_p1_mi.pdf"
//                     }
//                 },
//                 {
//                     "name": "math_ah_2022_p2",
//                     "path": "./sqa_pdfs\\math\\ah\\2022\\math_ah_2022_p2.pdf",
//                     "mi": {
//                         "name": "math_ah_2022_p2_mi",
//                         "path": "./sqa_pdfs\\math\\ah\\2022\\math_ah_2022_p2_mi.pdf"
//                     }
//                 }
//             ],
//             "2023": [
//                 {
//                     "name": "math_ah_2023_p1",
//                     "path": "./sqa_pdfs\\math\\ah\\2023\\math_ah_2023_p1.pdf",
//                     "mi": {
//                         "name": "math_ah_2023_p1_mi",
//                         "path": "./sqa_pdfs\\math\\ah\\2023\\math_ah_2023_p1_mi.pdf"
//                     }
//                 },
//                 {
//                     "name": "math_ah_2023_p2",
//                     "path": "./sqa_pdfs\\math\\ah\\2023\\math_ah_2023_p2.pdf",
//                     "mi": {
//                         "name": "math_ah_2023_p2_mi",
//                         "path": "./sqa_pdfs\\math\\ah\\2023\\math_ah_2023_p2_mi.pdf"
//                     }
//                 }
//             ]
//         },
//         "n5": {
//             "2018": [
//                 {
//                     "name": "math_n5_2018_all",
//                     "path": "./sqa_pdfs\\math\\n5\\2018\\math_n5_2018_all.pdf",
//                     "mi": {
//                         "name": "math_n5_2018_all_mi",
//                         "path": "./sqa_pdfs\\math\\n5\\2018\\math_n5_2018_all_mi.pdf"
//                     }
//                 }
//             ],
//             "2019": [
//                 {
//                     "name": "math_n5_2019_all",
//                     "path": "./sqa_pdfs\\math\\n5\\2019\\math_n5_2019_all.pdf",
//                     "mi": {
//                         "name": "math_n5_2019_all_mi",
//                         "path": "./sqa_pdfs\\math\\n5\\2019\\math_n5_2019_all_mi.pdf"
//                     }
//                 }
//             ],
//             "2022": [
//                 {
//                     "name": "math_n5_2022_p1",
//                     "path": "./sqa_pdfs\\math\\n5\\2022\\math_n5_2022_p1.pdf",
//                     "mi": {
//                         "name": "math_n5_2022_p1_mi",
//                         "path": "./sqa_pdfs\\math\\n5\\2022\\math_n5_2022_p1_mi.pdf"
//                     }
//                 },
//                 {
//                     "name": "math_n5_2022_p2",
//                     "path": "./sqa_pdfs\\math\\n5\\2022\\math_n5_2022_p2.pdf",
//                     "mi": {
//                         "name": "math_n5_2022_p2_mi",
//                         "path": "./sqa_pdfs\\math\\n5\\2022\\math_n5_2022_p2_mi.pdf"
//                     }
//                 }
//             ],
//             "2023": [
//                 {
//                     "name": "math_n5_2023_p1",
//                     "path": "./sqa_pdfs\\math\\n5\\2023\\math_n5_2023_p1.pdf",
//                     "mi": {
//                         "name": "math_n5_2023_p1_mi",
//                         "path": "./sqa_pdfs\\math\\n5\\2023\\math_n5_2023_p1_mi.pdf"
//                     }
//                 },
//                 {
//                     "name": "math_n5_2023_p2",
//                     "path": "./sqa_pdfs\\math\\n5\\2023\\math_n5_2023_p2.pdf",
//                     "mi": {
//                         "name": "math_n5_2023_p2_mi",
//                         "path": "./sqa_pdfs\\math\\n5\\2023\\math_n5_2023_p2_mi.pdf"
//                     }
//                 }
//             ]
//         },
//         "nh": {
//             "2018": [
//                 {
//                     "name": "math_nh_2018_all",
//                     "path": "./sqa_pdfs\\math\\nh\\2018\\math_nh_2018_all.pdf",
//                     "mi": {
//                         "name": "math_nh_2018_all_mi",
//                         "path": "./sqa_pdfs\\math\\nh\\2018\\math_nh_2018_all_mi.pdf"
//                     }
//                 }
//             ],
//             "2019": [
//                 {
//                     "name": "math_nh_2019_all",
//                     "path": "./sqa_pdfs\\math\\nh\\2019\\math_nh_2019_all.pdf",
//                     "mi": {
//                         "name": "math_nh_2019_all_mi",
//                         "path": "./sqa_pdfs\\math\\nh\\2019\\math_nh_2019_all_mi.pdf"
//                     }
//                 }
//             ],
//             "2022": [
//                 {
//                     "name": "math_nh_2022_p1",
//                     "path": "./sqa_pdfs\\math\\nh\\2022\\math_nh_2022_p1.pdf",
//                     "mi": {
//                         "name": "math_nh_2022_p1_mi",
//                         "path": "./sqa_pdfs\\math\\nh\\2022\\math_nh_2022_p1_mi.pdf"
//                     }
//                 },
//                 {
//                     "name": "math_nh_2022_p2",
//                     "path": "./sqa_pdfs\\math\\nh\\2022\\math_nh_2022_p2.pdf",
//                     "mi": {
//                         "name": "math_nh_2022_p2_mi",
//                         "path": "./sqa_pdfs\\math\\nh\\2022\\math_nh_2022_p2_mi.pdf"
//                     }
//                 }
//             ],
//             "2023": [
//                 {
//                     "name": "math_nh_2023_p1",
//                     "path": "./sqa_pdfs\\math\\nh\\2023\\math_nh_2023_p1.pdf",
//                     "mi": {
//                         "name": "math_nh_2023_p1_mi",
//                         "path": "./sqa_pdfs\\math\\nh\\2023\\math_nh_2023_p1_mi.pdf"
//                     }
//                 },
//                 {
//                     "name": "math_nh_2023_p2",
//                     "path": "./sqa_pdfs\\math\\nh\\2023\\math_nh_2023_p2.pdf",
//                     "mi": {
//                         "name": "math_nh_2023_p2_mi",
//                         "path": "./sqa_pdfs\\math\\nh\\2023\\math_nh_2023_p2_mi.pdf"
//                     }
//                 }
//             ]
//         }
//     },
//     "mod": [],
//     "mus": [],
//     "pe": [],
//     "phys": {
//         "ah": {
//             "2018": [
//                 {
//                     "name": "phys_ah_2018_all",
//                     "path": "./sqa_pdfs\\phys\\ah\\2018\\phys_ah_2018_all.pdf",
//                     "mi": {
//                         "name": "phys_ah_2018_all_mi",
//                         "path": "./sqa_pdfs\\phys\\ah\\2018\\phys_ah_2018_all_mi.pdf"
//                     }
//                 }
//             ],
//             "2019": [
//                 {
//                     "name": "phys_ah_2019_all",
//                     "path": "./sqa_pdfs\\phys\\ah\\2019\\phys_ah_2019_all.pdf",
//                     "mi": {
//                         "name": "phys_ah_2019_all_mi",
//                         "path": "./sqa_pdfs\\phys\\ah\\2019\\phys_ah_2019_all_mi.pdf"
//                     }
//                 }
//             ],
//             "2022": [
//                 {
//                     "name": "phys_ah_2022_qp",
//                     "path": "./sqa_pdfs\\phys\\ah\\2022\\phys_ah_2022_qp.pdf",
//                     "mi": {
//                         "name": "phys_ah_2022_qp_mi",
//                         "path": "./sqa_pdfs\\phys\\ah\\2022\\phys_ah_2022_qp_mi.pdf"
//                     },
//                     "sp": {
//                         "name": "phys_ah_2022_qp_sp",
//                         "path": "./sqa_pdfs\\phys\\ah\\2022\\phys_ah_2022_qp_sp.pdf"
//                     }
//                 }
//             ],
//             "2023": [
//                 {
//                     "name": "phys_ah_2023_qp",
//                     "path": "./sqa_pdfs\\phys\\ah\\2023\\phys_ah_2023_qp.pdf",
//                     "mi": {
//                         "name": "phys_ah_2023_qp_mi",
//                         "path": "./sqa_pdfs\\phys\\ah\\2023\\phys_ah_2023_qp_mi.pdf"
//                     },
//                     "sp": {
//                         "name": "phys_ah_2023_qp_sp",
//                         "path": "./sqa_pdfs\\phys\\ah\\2023\\phys_ah_2023_qp_sp.pdf"
//                     }
//                 }
//             ]
//         },
//         "n5": {
//             "2018": [
//                 {
//                     "name": "phys_n5_2018_all",
//                     "path": "./sqa_pdfs\\phys\\n5\\2018\\phys_n5_2018_all.pdf",
//                     "mi": {
//                         "name": "phys_n5_2018_all_mi",
//                         "path": "./sqa_pdfs\\phys\\n5\\2018\\phys_n5_2018_all_mi.pdf"
//                     }
//                 }
//             ],
//             "2019": [
//                 {
//                     "name": "phys_n5_2019_all",
//                     "path": "./sqa_pdfs\\phys\\n5\\2019\\phys_n5_2019_all.pdf",
//                     "mi": {
//                         "name": "phys_n5_2019_all_mi",
//                         "path": "./sqa_pdfs\\phys\\n5\\2019\\phys_n5_2019_all_mi.pdf"
//                     }
//                 }
//             ],
//             "2022": [
//                 {
//                     "name": "phys_n5_2022_s1",
//                     "path": "./sqa_pdfs\\phys\\n5\\2022\\phys_n5_2022_s1.pdf",
//                     "mi": {
//                         "name": "phys_n5_2022_s1_mi",
//                         "path": "./sqa_pdfs\\phys\\n5\\2022\\phys_n5_2022_s1_mi.pdf"
//                     },
//                     "sp": {
//                         "name": "phys_n5_2022_s1_sp",
//                         "path": "./sqa_pdfs\\phys\\n5\\2022\\phys_n5_2022_s1_sp.pdf"
//                     }
//                 },
//                 {
//                     "name": "phys_n5_2022_s2",
//                     "path": "./sqa_pdfs\\phys\\n5\\2022\\phys_n5_2022_s2.pdf",
//                     "mi": {
//                         "name": "phys_n5_2022_s2_mi",
//                         "path": "./sqa_pdfs\\phys\\n5\\2022\\phys_n5_2022_s2_mi.pdf"
//                     },
//                     "sp": {
//                         "name": "phys_n5_2022_s2_sp",
//                         "path": "./sqa_pdfs\\phys\\n5\\2022\\phys_n5_2022_s2_sp.pdf"
//                     }
//                 }
//             ],
//             "2023": [
//                 {
//                     "name": "phys_n5_2023_s1",
//                     "path": "./sqa_pdfs\\phys\\n5\\2023\\phys_n5_2023_s1.pdf",
//                     "mi": {
//                         "name": "phys_n5_2023_s1_mi",
//                         "path": "./sqa_pdfs\\phys\\n5\\2023\\phys_n5_2023_s1_mi.pdf"
//                     },
//                     "sp": {
//                         "name": "phys_n5_2023_s1_sp",
//                         "path": "./sqa_pdfs\\phys\\n5\\2023\\phys_n5_2023_s1_sp.pdf"
//                     }
//                 },
//                 {
//                     "name": "phys_n5_2023_s2",
//                     "path": "./sqa_pdfs\\phys\\n5\\2023\\phys_n5_2023_s2.pdf",
//                     "mi": {
//                         "name": "phys_n5_2023_s2_mi",
//                         "path": "./sqa_pdfs\\phys\\n5\\2023\\phys_n5_2023_s2_mi.pdf"
//                     },
//                     "sp": {
//                         "name": "phys_n5_2023_s2_sp",
//                         "path": "./sqa_pdfs\\phys\\n5\\2023\\phys_n5_2023_s2_sp.pdf"
//                     }
//                 }
//             ]
//         },
//         "nh": {
//             "2018": [
//                 {
//                     "name": "phys_nh_2018_all",
//                     "path": "./sqa_pdfs\\phys\\nh\\2018\\phys_nh_2018_all.pdf",
//                     "mi": {
//                         "name": "phys_nh_2018_all_mi",
//                         "path": "./sqa_pdfs\\phys\\nh\\2018\\phys_nh_2018_all_mi.pdf"
//                     }
//                 }
//             ],
//             "2019": [
//                 {
//                     "name": "phys_nh_2019_all",
//                     "path": "./sqa_pdfs\\phys\\nh\\2019\\phys_nh_2019_all.pdf",
//                     "mi": {
//                         "name": "phys_nh_2019_all_mi",
//                         "path": "./sqa_pdfs\\phys\\nh\\2019\\phys_nh_2019_all_mi.pdf"
//                     }
//                 }
//             ],
//             "2022": [
//                 {
//                     "name": "phys_nh_2022_p1",
//                     "path": "./sqa_pdfs\\phys\\nh\\2022\\phys_nh_2022_p1.pdf",
//                     "mi": {
//                         "name": "phys_nh_2022_p1_mi",
//                         "path": "./sqa_pdfs\\phys\\nh\\2022\\phys_nh_2022_p1_mi.pdf"
//                     },
//                     "sp": {
//                         "name": "phys_nh_2022_p1_sp",
//                         "path": "./sqa_pdfs\\phys\\nh\\2022\\phys_nh_2022_p1_sp.pdf"
//                     }
//                 },
//                 {
//                     "name": "phys_nh_2022_p2",
//                     "path": "./sqa_pdfs\\phys\\nh\\2022\\phys_nh_2022_p2.pdf",
//                     "mi": {
//                         "name": "phys_nh_2022_p2_mi",
//                         "path": "./sqa_pdfs\\phys\\nh\\2022\\phys_nh_2022_p2_mi.pdf"
//                     },
//                     "sp": {
//                         "name": "phys_nh_2022_p2_sp",
//                         "path": "./sqa_pdfs\\phys\\nh\\2022\\phys_nh_2022_p2_sp.pdf"
//                     }
//                 }
//             ],
//             "2023": [
//                 {
//                     "name": "phys_nh_2023_p1",
//                     "path": "./sqa_pdfs\\phys\\nh\\2023\\phys_nh_2023_p1.pdf",
//                     "mi": {
//                         "name": "phys_nh_2023_p1_mi",
//                         "path": "./sqa_pdfs\\phys\\nh\\2023\\phys_nh_2023_p1_mi.pdf"
//                     },
//                     "sp": {
//                         "name": "phys_nh_2023_p1_sp",
//                         "path": "./sqa_pdfs\\phys\\nh\\2023\\phys_nh_2023_p1_sp.pdf"
//                     }
//                 },
//                 {
//                     "name": "phys_nh_2023_p2",
//                     "path": "./sqa_pdfs\\phys\\nh\\2023\\phys_nh_2023_p2.pdf",
//                     "mi": {
//                         "name": "phys_nh_2023_p2_mi",
//                         "path": "./sqa_pdfs\\phys\\nh\\2023\\phys_nh_2023_p2_mi.pdf"
//                     },
//                     "sp": {
//                         "name": "phys_nh_2023_p2_sp",
//                         "path": "./sqa_pdfs\\phys\\nh\\2023\\phys_nh_2023_p2_sp.pdf"
//                     }
//                 }
//             ]
//         }
//     },
//     "prc": [],
//     "prw": [],
//     "spa": []
// };