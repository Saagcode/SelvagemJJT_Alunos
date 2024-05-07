import { useState, useEffect } from "react";
import logoSelvagem from "../../public/images/logoSelvagem.png";
import "@fortawesome/fontawesome-free/css/all.css";
import "./login.css";
import "../media-queries/login_media-queries.css";
import Aos from "aos";
import "aos/dist/aos.css";
import kimono from "../../public/images/kimono.png";
import Swal from "sweetalert2";
import { ScaleLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function Login() {
  const [openModalLoading, setOpenModalLoading] = useState(false);
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    Aos.init();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://selvagemjjt-alunos-server.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, password: id }),
        }
      );
      localStorage.setItem("username", username);

      if (response.ok) {
        setOpenModalLoading(true);
        console.log("Requisição para /users bem-sucedida!");
        setTimeout(() => {
          Swal.fire({
            title: "Identificação realizada",
            icon: "success",
          });
          setOpenModalLoading(false);
          navigate("/home");
        }, 2000);
        setId("");
        setUsername("");
      } else {
        setOpenModalLoading(true);
        console.error("Erro na requisição para /users:", response.statusText);
        setTimeout(() => {
          Swal.fire({
            title: "Erro:",
            text: "ID não preenchido ou incorreto.",
            icon: "error",
          });
          setOpenModalLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Erro ao enviar requisição para /users:", error);
    }
  };
  function closeLoader() {
    setOpenModalLoading(false);
  }

  return (
    <>
      {openModalLoading && (
        <div className="backdrop-loading" onClick={closeLoader}>
          <dialog className="modal-loading">
            <div>
              <ScaleLoader color="#ffbb00" size={100} loading={true} />
            </div>
          </dialog>
        </div>
      )}
      <section className="section-logo">
        <div>
          <img src={logoSelvagem} alt="logotipo" className="logo-selvagem" />
        </div>
      </section>
      <img
        src={kimono}
        alt=""
        className={id ? "kimono-img-writted" : "kimono-img"}
      />
      <section
        className="container_section-form"
        data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-offset="50"
      >
        <form action="post">
          <div
            className="title-text"
            data-aos="fade-left"
            data-aos-duration="2000"
            data-aos-offset="50"
          >
            <h1>Login</h1>
          </div>
          <div className="learner-input-section">
            <h2 className="title-id">Sua ID*</h2>
            <input
              type="number"
              placeholder="Preencha somente números"
              value={id}
              onChange={(e) => setId(e.target.value)}
              class="no-spin"
            />
            <h2 className="title-id">Seu Nome*</h2>
            <input
              type="String"
              placeholder="Nome completo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              class="no-spin"
            />
            <button type="button" className="btn_submit" onClick={handleSubmit}>
              Entrar
            </button>
          </div>
          <div></div>
        </form>
      </section>
    </>
  );
}

export default Login;
