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
  fit: 'Good' | 'Great',
  code: string,
  on_the_job: {
    task: string[],
  };
  resources: {
    resources: { href: string, title: string }[],
  };
  title: string,
  what_they_do: string,
}
