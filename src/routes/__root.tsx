import { HeadContent, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "React.js Error — NEOASSUR",
      },
      {
        name: "description",
        content:
          "Une erreur React.js est survenue. Cette page est temporairement indisponible.",
      },
      {
        name: "robots",
        content: "noindex, nofollow",
      },
    ],
  }),

  component: ErrorPage,
});

function ErrorPage() {
  return (
    <>
      <HeadContent />

      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          background: "#d40000",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          boxSizing: "border-box",
          fontFamily:
            "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "120px",
              fontWeight: 900,
              lineHeight: 1,
              marginBottom: "30px",
            }}
          >
            500
          </div>

          <h1
            style={{
              fontSize: "42px",
              fontWeight: 800,
              margin: "0 0 20px",
            }}
          >
            React.js Error
          </h1>

          <p
            style={{
              fontSize: "20px",
              lineHeight: 1.6,
              margin: "0 auto 30px",
              maxWidth: "700px",
            }}
          >
            Une erreur inattendue est survenue dans l'application React.
            La page ne peut pas être chargée correctement.
          </p>

          <div
            style={{
              background: "#ffffff",
              color: "#111111",
              padding: "24px",
              borderRadius: "8px",
              textAlign: "left",
              fontFamily:
                "Consolas, Monaco, monospace",
              fontSize: "15px",
              lineHeight: 1.6,
              overflowX: "auto",
            }}
          >
            <div>
              <strong>Error:</strong> React application failed to render.
            </div>

            <div>
              <strong>Type:</strong> Runtime / Rendering Error
            </div>

            <div>
              <strong>Status:</strong> 500
            </div>

            <div>
              <strong>Component:</strong> RootComponent
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              marginTop: "30px",
              padding: "14px 28px",
              border: "none",
              borderRadius: "6px",
              background: "#ffffff",
              color: "#d40000",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Reload application
          </button>
        </div>
      </div>
    </>
  );
}
