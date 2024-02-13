import prevQR from "../assets/antesqr.webp";
import { useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import { jsPDF } from "jspdf";
const Form = () => {
  const [qrCreated, setQrCreated] = useState(false);
  const [url, setUrl] = useState("");
  const [loader, setLoader] = useState(false);

  //acá se mandan los datos al backend  y se hacen otras cosas como setear states
  const handleSubmit = async (e) => {
    e.preventDefault();
    const convertir = {
      url,
    };
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(convertir),
      });

      if (response.ok) {
        const ready = await response.json();
        setTimeout(() => {
          setQrCreated(ready.created);
        }, 1000);
      } else {
        console.error("Error al enviar datos al backend:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
    return;
  };

  function PDFGenerator() {
    // Crear un documento PDF
    let doc = new jsPDF();

    // Agregar título
    doc.setFontSize(26);
    doc.setFont("helvetica");
    doc.text("Código QR", 10, 20);

    // Agregar imagen (sustituye 'ruta_de_la_imagen.jpg' por la URL o ruta de tu imagen)
    let imgData = `http://localhost:3000/QrCode.png`;
    doc.addImage(imgData, "JPEG", 60, 30, 80, 80);

    // Guardar el documento como un archivo PDF
    doc.save("Codigo_QR.pdf");
  }

  return (
    <div className="principal">
      <section>
        <img
          src={qrCreated ? `http://localhost:3000/QrCode.png` : prevQR}
          alt="codigo generado"
          onError={(e) =>
            console.error("Error al cargar la imagen:", e.target.src, e)
          }
        />
        {loader && (
          <BarLoader
            color={"#0C519E"}
            loading={loader}
            cssOverride={{ marginTop: "3%", width: "80%" }}
            aria-label="Loading bar"
            data-testid="loader"
          />
        )}
      </section>
      <form>
        <label htmlFor="url">Ingresa la URl:</label>
        <input
          type="text"
          id="url"
          placeholder="https://ejemplo/url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="buttons">
          <button className="generar" onClick={handleSubmit}>
            Generar QR
          </button>
          {qrCreated && (
            <button className="descargar" onClick={PDFGenerator}>
              Descargar Qr
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
