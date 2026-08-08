import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { TeamCard } from "@/components/cards/TeamCard";
import { team } from "@/lib/data/team";

export function Team() {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="The team" title="The people behind the systems." />
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 70}>
              <TeamCard member={member} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
