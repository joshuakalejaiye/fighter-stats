'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const Questions = ({
  questions,
}: {
  questions: { question: string; answer: string }[]
}) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {questions.map((el) => {
        const questionNo = String(questions.indexOf(el))

        return (
          <Question
            key={`question-${questionNo}`}
            question={el.question}
            answer={el.answer}
            questionNo={questionNo}
          />
        )
      })}
    </Accordion>
  )
}

const Question = ({ question, answer, questionNo }: Record<string, string>) => {
  return (
    <AccordionItem value={`item-${questionNo}`}>
      <AccordionTrigger className="text-xl text-left">
        {question}
      </AccordionTrigger>
      <AccordionContent>{answer}</AccordionContent>
    </AccordionItem>
  )
}

export default Questions
