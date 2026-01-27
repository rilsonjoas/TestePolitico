import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Teste Político 8 Valores - Descubra sua ideologia política";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Teste Político
          </span>
          <span
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: "#3b82f6",
            }}
          >
            8 Valores
          </span>
        </div>

        {/* Subtitle */}
        <span
          style={{
            fontSize: 28,
            color: "#9ca3af",
            marginBottom: 50,
          }}
        >
          Descubra sua ideologia política em 70 questões
        </span>

        {/* Values */}
        <div
          style={{
            display: "flex",
            gap: 16,
          }}
        >
          {[
            { name: "Igualdade", color: "#e63946" },
            { name: "Nação", color: "#f77f00" },
            { name: "Liberdade", color: "#ffc300" },
            { name: "Tradição", color: "#8338ec" },
            { name: "Mercado", color: "#1d3557" },
            { name: "Global", color: "#a8dadc" },
            { name: "Autoridade", color: "#457b9d" },
            { name: "Progresso", color: "#3a86ff" },
          ].map((value) => (
            <div
              key={value.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                  background: value.color,
                }}
              />
              <span
                style={{
                  fontSize: 14,
                  color: "#9ca3af",
                  marginTop: 8,
                }}
              >
                {value.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
