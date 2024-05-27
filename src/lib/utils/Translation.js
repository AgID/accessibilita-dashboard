import Layout from "./pages/Layout";
import Fallback from "./pages/Fallback";
import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/index";
import MoniPage from "./pages/Monitoraggio";
import ErrPage from "./pages/Errori";
import DicPage from "./pages/Dichiarazione";
import ObiPage from "./pages/Obiettivi";
import ProgPage from "./pages/Progetto";
import TimePage from "./pages/Cronologia";
import OpenDataPage from "./pages/Opendata";
import MediaPolicy from "./pages/MediaPolicy";
import LegalPolicy from "./pages/NoteLegali";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactPage from "./pages/Contattaci";

import Feedback from "./components/Feedback";
import Downloads from "./components/CsvPdfButtons";
import DataTable from "./components/DataTable";

import HomeMain from "./components/HomeMain";
import ProgMain from "./components/ProgettoMain";
import Cronologia from "./components/Cronologia";
import OpenDataMain from "./components/OpenDataMain";
import ContattaciMain from "./components/ContattaciMain";

import MoniMain from "./components/MonitoraggioMainCard";
import MoniCategoria from "./components/MonitoraggioCategoria";
import MoniAreaGeo from "./components/MonitoraggioAreaGeo";
import MoniTable from "./components/MonitoraggioRegioneTable";
import MoniPDF from "./components/MonitoraggioPdfCard";
import MoniPDFChart from "./components/MonitoraggioPdfChart";
import MoniAPP from "./components/MonitoraggioAppCard";
import MoniAPPChart from "./components/MonitoraggioAppChart";

import ErroriMain from "./components/ErroriMainCard";
import ErroriTable from "./components/ErroriTable";
import ErrPDF from "./components/ErroriPDFTable";
import ErrCard from "./components/ErrCard";
import ErroriPrincipio from "./components/ErroriPrincipio";
import ErroriTableApp from "./components/ErroriTableApprofondito";

import DicMainCard from "./components/DichiarazioniMainCard";
import DicLineChart from "./components/DichiarazioniLineChart";
import DicAuto from "./components/DichiarazioniAutovalutazione";
import DicIstMain from "./components/DichiarazioniIstituzionaliMain";
import DicIstHalf from "./components/DichiarazioniIstituzionaliHalf";
import DicAutoIst from "./components/DichiarazioniAutovalutazioneIstituzionali";
import DicIstTable from "./components/DichiarazioniIstituzionaliTable";
import DicTemaMain from "./components/DichiarazioniTematiciMain";
import DicAutoTema from "./components/DichiarazioniAutovalutazioneTematici";
import DicTemaTable from "./components/DichiarazioniTematiciTable";
import DicAutoIvsT from "./components/DichiarazioniAutovalutazioneConfronto";
import DicPie from "./components/DichiarazioniPieChart";
import DicAppTable from "./components/DichiarazioniAppTable";
import DicAppPie from "./components/DichiarazioniAppConfrontoChart";
import DicAppConf from "./components/DichiarazioneAppConfrontoConformita"

import ObiMainCard from "./components/ObiettiviMainCard";
import ObiLineChart from "./components/ObiettiviLineChart";
import ObiInter from "./components/ObiettiviIntervento";
import ObiTable from "./components/ObiettiviTable";

export default {
  it: {
    ...Layout.it,
    ...Fallback.it,
    ...HomePage.it,
    ...MoniPage.it,
    ...DicPage.it,
    ...ErrPage.it,
    ...ObiPage.it,
    ...ProgPage.it,
    ...TimePage.it,
    ...OpenDataPage.it,
    ...MediaPolicy.it,
    ...LegalPolicy.it,
    ...PrivacyPolicy.it,
    ...ContactPage.it,
    ...Header.it,
    ...Footer.it,
    ...Feedback.it,
    ...Downloads.it,
    ...DataTable.it,
    ...HomeMain.it,
    ...MoniMain.it,
    ...MoniCategoria.it,
    ...MoniAreaGeo.it,
    ...MoniTable.it,
    ...MoniPDF.it,
    ...MoniPDFChart.it,
    ...MoniAPP.it,
    ...MoniAPPChart.it,
    ...ErroriMain.it,
    ...ErroriTable.it,
    ...ErroriTableApp.it,
    ...ErrCard.it,
    ...ErroriPrincipio.it,
    ...ErrPDF.it,
    ...DicMainCard.it,
    ...DicAuto.it,
    ...DicLineChart.it,
    ...DicIstMain.it,
    ...DicIstHalf.it,
    ...DicAutoIst.it,
    ...DicIstTable.it,
    ...DicTemaMain.it,
    ...DicAutoTema.it,
    ...DicTemaTable.it,
    ...DicAutoIvsT.it,
    ...DicPie.it,
    ...DicAppPie.it,
    ...DicAppTable.it,
    ...DicAppConf.it,
    ...ObiMainCard.it,
    ...ObiLineChart.it,
    ...ObiInter.it,
    ...ObiTable.it,
    ...ProgMain.it,
    ...Cronologia.it,
    ...OpenDataMain.it,
    ...ContattaciMain.it,
  },
  en: {
    ...Layout.en,
    ...Fallback.en,
    ...HomePage.en,
    ...MoniPage.en,
    ...DicPage.en,
    ...ErrPage.en,
    ...ObiPage.en,
    ...ProgPage.en,
    ...TimePage.en,
    ...OpenDataPage.en,
    ...MediaPolicy.en,
    ...LegalPolicy.en,
    ...PrivacyPolicy.en,
    ...ContactPage.en,
    ...Header.en,
    ...Footer.en,
    ...Feedback.en,
    ...Downloads.en,
    ...DataTable.en,
    ...HomeMain.en,
    ...MoniMain.en,
    ...MoniCategoria.en,
    ...MoniAreaGeo.en,
    ...MoniTable.en,
    ...MoniPDF.en,
    ...MoniPDFChart.en,
    ...MoniAPP.en,
    ...MoniAPPChart.en,
    ...ErroriMain.en,
    ...ErroriTable.en,
    ...ErroriTableApp.en,
    ...ErrCard.en,
    ...ErroriPrincipio.en,
    ...ErrPDF.en,
    ...DicMainCard.en,
    ...DicAuto.en,
    ...DicLineChart.en,
    ...DicIstMain.en,
    ...DicIstHalf.en,
    ...DicAutoIst.en,
    ...DicIstTable.en,
    ...DicTemaMain.en,
    ...DicAutoTema.en,
    ...DicTemaTable.en,
    ...DicAutoIvsT.en,
    ...DicPie.en,
    ...DicAppPie.en,
    ...DicAppTable.en,
    ...DicAppConf.en,
    ...ObiMainCard.en,
    ...ObiLineChart.en,
    ...ObiInter.en,
    ...ObiTable.en,
    ...ProgMain.en,
    ...Cronologia.en,
    ...OpenDataMain.en,
    ...ContattaciMain.en,
  },
};
