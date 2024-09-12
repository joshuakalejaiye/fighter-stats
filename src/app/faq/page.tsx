import ContentSection from '@/components/content-section'
import Questions from '@/components/questions.tsx'

export default async function Faq() {
  const questions = [
    {
      question: `"Aren't these numbers lower than they should be ?"`,
      answer:
        'This only takes PC data into account; if Xbox and PlayStation ever decide to play nice and share their player numbers, I’ll add them to this.',
    },
    {
      question: `"Why isn't my favourite game here ?"`,
      answer:
        'I’m sorry. It either isn’t on Steam or I had to prioritise other games, there is a limit on how many I can keep track of right now.',
    },
    {
      question: 'Why is this data slightly different from Steam Charts ?',
      answer:
        'I honestly don’t know, I show you what Valve showed me in the last hour.',
    },
  ]

  return (
    <ContentSection className="">
      <h1 className="text-5xl font-semibold pl-4 text-left">FAQ</h1>
      <div className="p-4 pb-8">
        <Questions questions={questions} />
      </div>
    </ContentSection>
  )
}
