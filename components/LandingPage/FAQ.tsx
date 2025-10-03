import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const FAQ = () => {
  return (
    <section id="faq">
      <div className="mx-auto max-w-5xl px-6 md:px-8 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Questions, answered
          </h2>
        </div>
        <div className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          <Accordion
            type="single"
            collapsible
            className="w-full px-5"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Is Synced only for couples?</AccordionTrigger>
              <AccordionContent>
                <p className="mt-3 text-sm text-slate-600">
                  It’s designed for two people, whether romantic partners, best
                  friends, or roommates.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How private is our space?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Your space is private by default and only accessible to you
                  and the person you invite.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can we export our data?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Yes, you can export your photos, notes, and lists anytime.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger>Do we both need to upgrade to pro?</AccordionTrigger>
                <AccordionContent>
                    <p>
                        No, only one person needs to upgrade to pro for both users to
                        access the premium features.
                    </p>
                </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};
export default FAQ;
