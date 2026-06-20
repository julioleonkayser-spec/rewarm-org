import Nav from '@/components/nav/Nav'
import Hero from '@/components/hero/Hero'
import AudioDemo from '@/components/audio-demo/AudioDemo'
import ProblemSolution from '@/components/problem-solution/ProblemSolution'
import HowItWorks from '@/components/how-it-works/HowItWorks'
import DashboardPreview from '@/components/dashboard-preview/DashboardPreview'
import Results from '@/components/results/Results'
import ROICalculator from '@/components/roi-calculator/ROICalculator'
import FAQ from '@/components/faq/FAQ'
import Pricing from '@/components/pricing/Pricing'
import Footer from '@/components/footer/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <AudioDemo />
        <ProblemSolution />
        <HowItWorks />
        <DashboardPreview />
        <Results />
        <ROICalculator />
        <FAQ />
        <Pricing />
      </main>
      <Footer />
    </>
  )
}
