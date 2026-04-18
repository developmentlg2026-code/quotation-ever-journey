import { GoogleGenAI, Type } from "@google/genai";

export async function POST(request) {
  try {


    console.log('Llega al api para extraer datos');
    const { imageBase64 } = await request.json();

    if (!imageBase64) {
      return Response.json({ error: "No se proporcionó ninguna imagen" }, { status: 400 });
    }

    // Extraer el tipo MIME y los datos base64 puros
    const mimeType = imageBase64.match(/data:(.*?);base64,/)[1];
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    // Inicializar Gemini

    console.log('El api Key es:------------>',process.env.GEMINI_API_KEY);
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Pedirle a Gemini que extraiga los datos en formato JSON
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType,
          },
        },
        "Extrae la siguiente información de esta Cédula de Identidad Venezolana. Si no puedes leer algo, déjalo en blanco."
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            cedula: { type: Type.STRING, description: "Número de cédula (ej. V-12.345.678)" },
            apellidos: { type: Type.STRING, description: "Apellidos de la persona" },
            nombres: { type: Type.STRING, description: "Nombres de la persona" },
            fechaNacimiento: { type: Type.STRING, description: "Fecha de nacimiento" },
            estadoCivil: { type: Type.STRING, description: "Estado civil (S, C, D, V)" }
          }
        }
      }
    });

    const extractedData = JSON.parse(response.text);

    return Response.json({ success: true, data: extractedData });

  } catch (error) {
    console.error("Error procesando la imagen:", error);
    return Response.json({ error: "Error al procesar la imagen de la cédula" }, { status: 500 });
  }
}