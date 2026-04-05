export interface TocEntry {
  id: string;
  label: string;
  index: number;
}

export const defaultEntries: TocEntry[] = [
  { id: "hero",         label: "whoami",          index: 0 },
  { id: "tedx",         label: "featured",        index: 1 },
  { id: "skills",       label: "skills",          index: 2 },
  { id: "tools",        label: "tools",           index: 3 },
  { id: "experience",   label: "work-experience", index: 4 },
  { id: "projects",     label: "projects",        index: 5 },
  { id: "certificates", label: "certificates",    index: 6 },
  { id: "extra",        label: "extra",           index: 7 },
  { id: "blogs",        label: "blogs",           index: 8 },
  { id: "videos",       label: "videos",          index: 9 },
];

export const padIndex = (n: number) => String(n).padStart(2, "0");
