// Importamos las imágenes (TypeScript reconocerá las rutas)
import image1 from '../assets/20250509_154752.jpg';
import image2 from '../assets/20250509_214511.jpg';
import image3 from '../assets/20250511_134352_1.jpg';
import image4 from '../assets/20250513_085554.jpg';
import image5 from '../assets/20250513_145747.jpg';

// Definimos la estructura de un recuerdo
export interface Memory {
  text: string;
  img: string;
}

export const memories: Memory[] = [
  { 
    text: "Desde el primer día...", 
    img: image1 
  },
  { 
    text: "Cada momento a tu lado es único.", 
    img: image2 
  },
  { 
    text: "Eres mi persona favorita.", 
    img: image3 
  },
  { 
    text: "Eres el solecito que alumbra mis dias", 
    img: image4 
  },
  { 
    text: "Te amo y te extraño cada dia de mi vida con el alma", 
    img: image5 
  },
];