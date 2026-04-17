// Team members — fill in real bios and LinkedIn URLs before launch.

export interface TeamMember {
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  readonly linkedin?: string;
}

export const team: readonly TeamMember[] = [
  // PLACEHOLDER — replace with real team member data
  {
    name: "Team Member Name",
    role: "Founder and Principal",
    bio: "Brief bio about background, experience, licensing, and approach to documentation and permit coordination. Two to three sentences works well here. Speak to credentials and the type of work you specialize in.",
    linkedin: "", // optional — full URL e.g. https://linkedin.com/in/username
  },
  // Add more team members as needed
];
