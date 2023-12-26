import { Tldraw, track, useEditor } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useYjsStore } from "./useYjsStore";

const HOST_URL =
  import.meta.env.MODE === "development"
    ? "ws://localhost:1234"
    : "wss://demos.yjs.dev";

function App() {
  const store = useYjsStore({
    roomId: "droom1",
    hostUrl: HOST_URL,
  });

  return (
    <>
      <div className="container-fluid" style={{ height: "100vh" }}>
        <Tldraw autoFocus store={store} shareZone={<SharedEditor />} />
      </div>
    </>
  );
}

const SharedEditor = track(() => {
  const editor = useEditor();
  const { color, name } = editor.user.getUserPreferences();

  return (
    <>
      <div
        style={{
          pointerEvents: "all",
          display: "flex",
        }}
      >
        <input
          type="color"
          value={color}
          onChange={(e) => {
            editor.user.updateUserPreferences({
              color: e.currentTarget.value,
            });
          }}
        />

        <input
          value={name}
          onChange={(e) => {
            editor.user.updateUserPreferences({
              name: e.currentTarget.value,
            });
          }}
        />
      </div>
    </>
  );
});

export default App;
