export interface IWork {
  _id?: string;
  category: string;
  image: string;
  title: string;
  frontend?: string;
  backend?: string;
  liveLink: string;
  description: string;
  technologies: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateWorkForm {
  category: string;
  title: string;
  liveLink: string;
  description: string;
  technologies: string; // String for form input
}

export interface ICreateWorkRequest {
  category: string;
  title: string;
  liveLink: string;
  description: string;
  technologies: string[]; // Array for API request
} 