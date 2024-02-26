import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Collapse, Modal, Popover, Skeleton, message } from "antd";
import { format } from "date-fns";
import { FaGithub, FaDiscord, FaArrowLeft } from "react-icons/fa";
import { LuUserPlus2 } from "react-icons/lu";
import { FaBookmark , FaGear, FaAddressBook } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";






import Project from "../components/Project";
import Layout from "../components/Layout";
import User from "../components/User";
import Language from "../components/Language";
import axios from "../api/axios.js";

import "../stylesheets/UserDetail.scss";
import { removeUser } from "../slices/index.js";

const UserPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const loggedUser = useSelector((state) => state.data.user) || {};
  const token = useSelector((state) => state.data.token) || null;

  //===========
  //STATE
  //===========
  const [user, setUser] = useState({});
  const [updateUser, setUpdateUser] = useState({});
  const [allLanguages, setAllLanguages] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [avatars, setAvatars] = useState([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState({
    user: true,
    languages: true,
  });
  const [modals, setModals] = useState({
    params: false,
    contacts: false,
    logout: false,
    avatars: false,
    favorites: false,
  });
  const [checkedState, setCheckedState] = useState([]);

  // Ajout / suppression d'un langage selon son état checked
  const handleLanguage = (languageId) => {
    // Mise à jour de la valeur du checked du langage sélectionné (true devient false et vice versa)
    const updatedCheckedState = checkedState.map((item, index) =>
      // parcourt le tableau et ne change que le langage selectionné
      index === languageId - 1 ? !item : item
    );

    // Mise à jour du tableau checked avec cette nouvelle donnée
    setCheckedState(updatedCheckedState);

    // 2 actions possible selon l'état checked :
    if (updatedCheckedState[languageId - 1]) {
      // si checked : true
      // Ajout de l'id du langage dans le tableau project.languages
      setUpdateUser({
        ...updateUser,
        languages: [...updateUser.languages, languageId],
      });
    } else {
      // si checked : false
      // Filtre le tableau project.languages pour retirer l'id du langage
      setUpdateUser({
        ...updateUser,
        languages: [...updateUser.languages.filter((id) => id !== languageId)],
      });
    }
  };

  const handleModals = (name, status) => {
    setModals({
      ...modals,
      [name]: status,
    });
  };

  const handleLoading = (name, status) => {
    setLoading({
      ...loading,
      [name]: status,
    });
  };

  const handleUpdateUser = (e) => {
    setUpdateUser({
      ...updateUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatar = (value) => {
    setUpdateUser({
      ...updateUser,
      avatar_id: value,
    });
  };

  //===========
  //API CALLS
  //===========

  /**
   * Récupère les données de l'utilisateur, ses projets, ses langages et ses favoris
   */
  const getData = async () => {
    const resUser = await axios
      .get(`/api/user/${id}`)
      .then((res) => res.data.user);
    document.title = `${resUser.name}`;
    setUser(resUser);
    handleLoading("user", false);

    const resProjects = await axios
      .get(`/api/projects/${id}`)
      .then((res) => res.data.projects);
    setUserProjects(resProjects);

    const languagesID = resUser.languagesList.map((language) => language.id);

    setUpdateUser({
      name: resUser.name,
      description: resUser.description,
      languages: languagesID,
      github: resUser.github,
      discord: resUser.discord,
      avatar_id: resUser.avatar_id,
    });
    setDate(resUser.created_at);
    if(loggedUser?.id == id ){
        console.log("test");
        const resFavorites = await axios.get(`/api/projects/favorites/${id}`, {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        });
        setUserFavorites(resFavorites.data.projects);
    }
  };

  /**
   * Récupère tous les langages
   */
  const getLanguages = async () => {
    if (loading.languages) {
      const resLanguages = await axios("/api/languages").then(
        (res) => res.data.languages
      );
      setAllLanguages(resLanguages);
      handleLoading("languages", false);
      // remplissage conditionnel tu tableau d'etat checked pour la liste des langages
      resLanguages.map((language) => {
        if (
          updateUser.languages.find(
            (userLanguage) => userLanguage === language.id
          )
        ) {
          setCheckedState((checkedState) => [...checkedState, true]);
        } else {
          setCheckedState((checkedState) => [...checkedState, false]);
        }
      });
    }
  };

  /**
   * Récupère tous les avatars
   */
  const getAvatars = async () => {
    const resAvatars = await axios.get("/api/avatars");
    setAvatars(resAvatars.data.avatars);
  };

  /**
   * Met à jour l'avatar de l'utilisateur
   */
  const updateAvatar = async () => {
    if(loggedUser?.id == id ){

        await axios.put(
            `/api/user/${user.id}/update/avatar`,
            { avatar: updateUser.avatar_id },
            { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
            );
            handleModals("avatars", false);
            message.success("Avatar mis à jour");
        }
  };

  const handleAvatars = () => {
    if (loggedUser?.id === user.id) {
      getAvatars();
      handleModals("avatars", true);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    if(loggedUser?.id == id ){
        const update = await axios.put(`/api/user/${id}/update`, updateUser, {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        });
        if (update.data.status === 200) {
            handleModals("params", false);
            message.success("Profil mis à jour");
        } else {
            message.error("Erreur");
        }
    }
  };

  const handleLogout = async () => {
      if(loggedUser?.id == id ){
        const res = await axios.post(`/api/logout/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.status === 200) {
            message.success(`Déconnexion réussie`);
            
            dispatch(removeUser(res.data));
        }
        navigate("/");
    }
  };

  useEffect(() => {
    getData();
  }, [id, modals.avatars, modals.params]);

  //===========
  //LISTS RENDERS
  //===========

  /**
   * Liste tous les avatars
   */
  const avatarsList = avatars.map((avatar, index) => {
    return (
      <div
        className="avatar"
        key={index}
        onClick={() => handleAvatar(avatar.id)}
        name="avatar_id"
      >
        <label htmlFor={avatar.url}></label>
        <input
          type="radio"
          id={avatar.url}
          value={avatar.id}
          checked={updateUser.avatar_id === avatar.id ? true : false}
          onChange={() => handleAvatar(avatar.id)}
          name="avatar_id"
        />
        <img
          src={`http://localhost:8000/images/avatars/${avatar.url}`}
          alt={avatar.url}
        />
      </div>
    );
  });

  /**
   * Liste les projets créés par l'utilisateur
   */
  const createdProjects = userProjects.filter((project) => project.user_id == id).map((project) => {
      return (
        <Project
          key={project.id}
          title={project.title}
          name={project.name}
          image={project.image}
          status={project.status}
          description={project.description}
          profil={project.profil}
          languages={project.languages}
          creator_id={project.user_id}
          collaborators={project.collaborators}
          collaborators_max={project.collaborators_max}
          id={project.id}
        ></Project>
      );
    });

  /**
   * Liste les projets auxquels participe l'utilisateur
   */
  const projectsList = userProjects.map((project) => {
    return (
      <Project
        key={project.id}
        title={project.title}
        name={project.name}
        image={project.image}
        status={project.status}
        description={project.description}
        profil={project.profil}
        languages={project.languages}
        creator_id={project.user_id}
        collaborators={project.collaborators}
        collaborators_max={project.collaborators_max}
        id={project.id}
      ></Project>
    );
  });

  /**
   * Liste les projets favoris
   */
  const favoritesList = userFavorites.map((project) => {
    return (
      <Project
        key={project.id}
        title={project.title}
        name={project.name}
        image={project.image}
        status={project.status}
        description={project.description}
        profil={project.profil}
        languages={project.languages}
        creator_id={project.user_id}
        collaborators={project.collaborators}
        collaborators_max={project.collaborators_max}
        id={project.id}
      ></Project>
    );
  });

  /**
   * Liste les langages de l'utilisateur
   */
  const languagesList = user.languagesList?.map((language, index) => {
    return (
      <Language key={language.id} name={language.name} image={language.logo} />
    );
  });

  /**
   * Liste tous les langages
   */
  const allLanguagesList = allLanguages.map((language, index) => {
    return (
      <Language
        key={language.id}
        name={language.name}
        checked={checkedState[index]}
        action={() => handleLanguage(language.id)}
        image={language.logo}
        type="checkbox"
      />
    );
  });

  /**
   * Formulaire de mise à jour utilisateur
   */
  const updateForm = () => {
    return (
      <form onSubmit={(e) => handleForm(e)} className="params">
        <div className="flex-col">
          <label htmlFor="name">Pseudo</label>
          <input
            type="text"
            id="name"
            name="name"
            value={updateUser.name}
            onChange={(e) => handleUpdateUser(e)}
            required
            max={20}
            min={3}
          />
        </div>
        <div className="flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            onChange={(e) => handleUpdateUser(e)}
            value={updateUser.description}
            maxLength={500}
          ></textarea>
        </div>
        <div className="form-group">
          <div className="flex-col">
            <label htmlFor="github">Github</label>
            <input
              type="text"
              id="github"
              name="github"
              value={updateUser.github}
              onChange={(e) => handleUpdateUser(e)}
              max={20}
            />
          </div>
          <div className="flex-col">
            <label htmlFor="discord">Discord</label>
            <input
              type="text"
              id="discord"
              name="discord"
              value={updateUser.discord}
              onChange={(e) => handleUpdateUser(e)}
              max={20}
            />
          </div>
        </div>
        <Collapse
          onChange={() => {
            getLanguages();
          }}
          items={[
            {
              label: "Langages",
              children: (
                <Skeleton loading={loading.languages} active>
                  <div className="languagesList-3">{allLanguagesList}</div>
                </Skeleton>
              ),
            },
          ]}
        />
        <button type="submit"className="btn-green center" >Valider</button>
      </form>
    );
  };

  //===========
  //MODALS
  //===========
  const paramsModal = () => {
    return (
      <Modal
        title="Paramètres du profil"
        open={modals.params}
        onCancel={() => handleModals("params", false)}
        footer={null}
        centered
      >
        {updateForm()}
      </Modal>
    );
  };

  const contactsModal = () => {
    return (
      <Modal
        title={`Contacts de ${user.name}`}
        open={modals.contacts}
        onCancel={() => handleModals("contacts", false)}
        footer={null}
        centered
      ></Modal>
    );
  };

  const logoutModal = () => {
    return (
      <Modal
        title={`Déconnexion`}
        open={modals.logout}
        onCancel={() => handleModals("logout", false)}
        footer={null}
        centered
      >
        <p>Voulez-vous vous déconnecter ?</p>
        <div className="flex center">
            <button type="button" className="btn-red" onClick={() => handleLogout()}>
            Oui
            </button>
            <button type="button" className="btn-green" onClick={() => handleModals("logout", false)}>
            Non
            </button>
        </div>
      </Modal>
    );
  };

  const avatarsModal = () => {
    return (
      <Modal
        title={`Changer d'avatar`}
        open={modals.avatars}
        onCancel={() => handleModals("avatars", false)}
        footer={null}
        centered
      >
        <div className="avatarsList">{avatarsList}</div>
        <button type="button" onClick={() => updateAvatar()}>
          Valider
        </button>
      </Modal>
    );
  };

  const favoritesModal = () => {
    return (
      <Modal
        title={`Favoris`}
        open={modals.favorites}
        onCancel={() => handleModals("favorites", false)}
        footer={null}
        centered
      >
        <div className="projectsList">{favoritesList}</div>
      </Modal>
    );
  };

  return (
    <Layout>
      {/* Modals */}
      {paramsModal()}
      {contactsModal()}
      {logoutModal()}
      {avatarsModal()}
      {favoritesModal()}

      <div id="user">
        <div className="user-profile">
          <FaArrowLeft
            size={25}
            className="top-left-btn"
            onClick={() => navigate(-1)}
          />
          {loggedUser?.id === user.id ? (
            <div className="top-right-btn">
              <button type="button" onClick={() => handleModals("favorites", true)} className="btn-yellow">
                <FaBookmark/>
                Favoris
              </button>
              <button type="button" onClick={() => handleModals("params", true)} className="btn-green" >
                <FaGear/>
                Paramètres
              </button>
              <button type="button" onClick={() => handleModals("logout", true)} className="btn-red" >
                <FiLogOut/>
                Déconnexion
              </button>
            </div>
          ) : (
            ""
          )}
          <div className="profile">
            <div
              className={
                loggedUser?.id === user.id ? "avatar img-hover" : "avatar"
              }
              onClick={() => handleAvatars()}
            >
              {loading.user ? (
                <Skeleton.Avatar active size={100} />
              ) : (
                <Fragment>
                  <img
                    src={`http://localhost:8000/images/avatars/${user.avatar}`}
                  />
                  {loggedUser.id === user.id ? (
                    <p className="hidden">Changer d'avatar</p>
                  ) : (
                    ""
                  )}
                </Fragment>
              )}
            </div>
            <div className="links">
            <Skeleton loading={loading.user} active paragraph={false}>
              {user.github ? (
                <Popover placement="right" title="" content="Copié !" trigger="click">
                  <div className="github" title="Copier" onClick={() => {
                      navigator.clipboard.writeText(user.github);
                    }}
                  >
                    <FaGithub size={25} />
                    <p>{user.github}</p>
                  </div>
                </Popover>
              ) : (
                ""
              )}
              {user.discord ? (
                <Popover
                  placement="right"
                  title=""
                  content="Copié !"
                  trigger="click"
                >
                  <div
                    className="discord"
                    title="Copier"
                    onClick={() => {
                      navigator.clipboard.writeText(user.discord);
                    }}
                  >
                    <FaDiscord size={25} className="discord-icon" />
                    <p>{user.discord}</p>
                  </div>
                </Popover>
              ) : (
                ""
              )}
                   
            </Skeleton>
            </div>
            <div className="contacts">
              {loggedUser?.id === user.id ? (
                ""
              ) : (
                <button type="button" className="btn-green">
                  <LuUserPlus2 />
                  Ajouter
                </button>
              )}
              <button type="button" onClick={() => handleModals("contacts", true)} className="btn-orange" >
                <FaAddressBook/>
                Contacts
              </button>
            </div>
          </div>
          <div className="description-profile">
            <div className="user-description">
              <Skeleton loading={loading.user} active>
                <div id="user-name">
                  <h1>{user.name}</h1>
                  <p className="date">
                    Membre depuis le : {date ? format(date, "dd/MM/yyyy") : ""}
                  </p>
                </div>
                {user.description ? (
                  <p>{user.description}</p>
                ) : loggedUser?.id === user.id ? (
                  <p onClick={() => handleModals("params", true)}>
                    Ajouter une description
                  </p>
                ) : (
                  ""
                )}
              </Skeleton>
            </div>
            <div id="user-languages">
              <h2>Langages connus :</h2>
              <Skeleton loading={loading.user} active paragraph={false}>
                {languagesList?.length > 0 ? (
                  <div className="languagesList-profile">{languagesList}</div>
                ) : loggedUser?.id === user.id ? (
                  <p onClick={() => handleModals("params", true)}>
                    Ajouter des langages
                  </p>
                ) : (
                  <p className="blank">
                    L'utilisateur n'a indiqué aucun langage pour le moment.
                  </p>
                )}
              </Skeleton>
            </div>
          </div>
        </div>
        <div className="user-body">
          <div id="user-created">
            <h2>Projets créés :</h2>
            <Skeleton loading={loading.user} active>
              {createdProjects?.length > 0 ? (
                <div className="projectsList">{createdProjects}</div>
              ) : (
                <p className="blank">
                  L'utilisateur n'a pas encore créé de projets.
                </p>
              )}
            </Skeleton>
          </div>
          <div id="user-projects">
            <h2>Participation :</h2>
            <Skeleton loading={loading.user} active>
              {projectsList?.length > 0 ? (
                <div className="projectsList">{projectsList}</div>
              ) : (
                <p className="blank">
                  L'utilisateur n'a participé à aucun projet pour le moment.
                </p>
              )}
            </Skeleton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserPage;
