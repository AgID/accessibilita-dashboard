import DichiarazioneSection from "./src/lib/sections/DichiarazioneSection.svelte"
import ErroriSection from "./src/lib/sections/ErroriSection.svelte"
import HomeSection from "./src/lib/sections/HomeSection.svelte"
import MediaPolicy from "./src/lib/sections/MediaPolicy.svelte"
import MonitoraggioSection from "./src/lib/sections/MonitoraggioSection.svelte"
import NoteLegali from "./src/lib/sections/NoteLegali.svelte"
import OpenDataSection from "./src/lib/sections/OpenDataSection.svelte"
import PrivacyPolicy from "./src/lib/sections/PrivacyPolicy.svelte"

const routes = [
  {
    name: '/',
    component: HomeSection,
  },
  { name: 'monitoraggio', component: MonitoraggioSection },
  { name: 'errori', component: ErroriSection },
  { name: 'dichiarazione', component: DichiarazioneSection },
  { name: 'opendata', component: OpenDataSection },
  { name: 'media-policy', component: MediaPolicy },
  { name: 'note-legali', component: NoteLegali },
  { name: 'privacy-policy', component: PrivacyPolicy },
 
]

export { routes }