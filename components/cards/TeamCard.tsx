import type { TeamMember } from "@/lib/data/team";

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="group">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-surface2">
        <div className="flex h-full w-full items-center justify-center transition-transform duration-700 ease-power3-out group-hover:scale-[1.04]">
          <span
            className="font-medium tracking-tightest text-accent/70"
            style={{ fontSize: "clamp(2.6rem, 4vw, 3.4rem)" }}
          >
            {member.initials}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-[16px] font-medium text-foreground transition-colors group-hover:text-accent">
          {member.name}
        </h3>
        <p className="mt-0.5 text-[13px] text-muted">{member.role}</p>
      </div>
    </div>
  );
}
