export interface CareerLinkEntity {
  code: string;
  fit: string;
  href: string;
  title: string,
}

export interface CareerEntity {
  also_called: {
    title: string[],
  };
  career_video: boolean,
  code: string,
  on_the_job: {
    task: string[],
  };
  resources: {
    resources: { href: string, title: string }[],
  };
  tags: {
    bright_outlook: boolean,
    green: boolean,
    apprenticeship: boolean,
  };
  title: string,
  what_they_do: string,
}
