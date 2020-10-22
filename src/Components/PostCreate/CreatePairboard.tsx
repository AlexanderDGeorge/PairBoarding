// import React, { useContext, useRef, useState } from "react";
// import styled from "styled-components";
// import { LANGUAGES, DIFFICULTIES } from "./constants";
// import { ModalContext, UserContext } from "../../Application";
// import { createPost } from "../../firebase/post";
// import { StyledButton, StyledField } from "../../styled-components/formStyles";
// import useOnOutsideClick from "../../util/useOnOutsideClick";
// import useLockBodyScroll from "../../util/useLockBodyScroll";
// import { PostSchema } from "../../firebase/schema";

export default () => {
    return null;
};

// export default () => {
//     const [title, setTitle] = useState("");
//     const [language, setLanguage] = useState("");
//     const [difficulty, setDifficulty] = useState<PostSchema["difficulty"]>(
//         DIFFICULTIES[0]
//     );
//     const [description, setDescription] = useState("");
//     const { uid, photoURL, score, username, postId } = useContext(UserContext)!;
//     const { handleModal } = useContext(ModalContext)!;
//     const modalRef = useRef(null);

//     useOnOutsideClick(modalRef, () => handleModal());
//     useLockBodyScroll();

//     async function handleClick() {
//         if (!postId) {
//             await createPost(
//                 { uid, photoURL, score, username },
//                 title,
//                 description,
//                 difficulty,
//                 language,
//                 2
//             );
//             handleModal();
//         }
//     }

//     return (
//         <CreatePairboard ref={modalRef}>
//             <h2>Create a Pairboard Post</h2>
//             <StyledField>
//                 <label htmlFor="title">title</label>
//                 <input
//                     type="text"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     required
//                     placeholder="LeetCode Problems in JavaScript"
//                 />
//             </StyledField>
//             <StyledField>
//                 <label htmlFor="language">language</label>
//                 <select
//                     name="language"
//                     onChange={(e) => setLanguage(e.target.value)}
//                 >
//                     <option disabled selected>
//                         -- select a language --
//                     </option>
//                     {LANGUAGES.map((language, i) => (
//                         <option key={i} value={language}>
//                             {language}
//                         </option>
//                     ))}
//                 </select>
//             </StyledField>
//             <StyledField>
//                 <label htmlFor="difficulty">difficulty</label>
//                 <select
//                     name="difficulty"
//                     // @ts-ignore
//                     onChange={(e) => setDifficulty(e.target.value)}
//                 >
//                     <option disabled selected>
//                         -- select a difficulty --
//                     </option>
//                     {DIFFICULTIES.map((difficulty, i) => (
//                         <option key={i} value={difficulty}>
//                             {difficulty}
//                         </option>
//                     ))}
//                 </select>
//             </StyledField>
//             {/* <StyledField>
//                 <label htmlFor="capacity">capacity</label>
//                 <input
//                     type="number"
//                     value={maxCap}
//                     onChange={(e) => setMaxCap(parseInt(e.target.value))}
//                     min={2}
//                     max={60}
//                     required
//                 />
//             </StyledField> */}
//             <StyledField style={{ height: "auto" }}>
//                 <label htmlFor="description">description</label>
//                 <textarea
//                     minLength={10}
//                     required
//                     style={{ minHeight: 200 }}
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     name="description"
//                     placeholder="What do you want to accomplish?"
//                 ></textarea>
//             </StyledField>
//             <StyledButton
//                 // [TODO]: fix disabled button
//                 disabled={description.length ? false : true}
//                 onClick={handleClick}
//             >
//                 Post
//             </StyledButton>
//         </CreatePairboard>
//     );
// };

// const CreatePairboard = styled.div`
//     min-height: 400px;
//     width: 300px;
//     padding: 10px;
//     background-color: ${(props) => props.theme.white};
//     display: flex;
//     flex-direction: column;
//     > h2 {
//         margin-bottom: 10px;
//     }
// `;
