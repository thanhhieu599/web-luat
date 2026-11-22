import { PageHero } from "./blocks";

export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { h: string; p: (string | string[])[] }[];
}) {
  return (
    <>
      <PageHero crumbs={[{ label: title }]} title={title} lead={`Cập nhật lần cuối: ${updated}`} />
      <section className="py-12 sm:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[260px_minmax(0,760px)] lg:gap-16">
          <nav aria-label="Mục lục" className="hidden lg:block">
            <ol className="sticky top-24 flex flex-col gap-2 border-l-2 border-line pl-4 text-[14.5px]">
              {sections.map((s, i) => (
                <li key={s.h}><a href={`#muc-${i + 1}`} className="text-gray hover:text-brand">{i + 1}. {s.h}</a></li>
              ))}
            </ol>
          </nav>
          <div className="prose-law">
            {sections.map((s, i) => (
              <div key={s.h}>
                <h2 id={`muc-${i + 1}`}>{i + 1}. {s.h}</h2>
                {s.p.map((p, j) =>
                  Array.isArray(p) ? (
                    <ul key={j}>{p.map((li) => <li key={li}>{li}</li>)}</ul>
                  ) : (
                    <p key={j}>{p}</p>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
