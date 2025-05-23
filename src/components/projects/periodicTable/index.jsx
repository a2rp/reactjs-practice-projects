// import React from "react";
// import { Wrapper, TableGrid, GroupLegend } from "./styled";
// import { periodicElements } from "./periodicElements_full_withPlaceholders";
// import ElementBox from "./ElementBox";

// const App = () => {
//     return (
//         <Wrapper>
//             <h1>Periodic Table</h1>
//             <TableGrid>
//                 {periodicElements.map((el, i) =>
//                     el.type === "placeholder" ? (
//                         <div
//                             key={`placeholder-${i}`}
//                             style={{
//                                 gridColumn: el.gridColumn,
//                                 gridRow: el.gridRow,
//                             }}
//                         />
//                     ) : (
//                         <ElementBox
//                             key={`element-${el.atomicNumber}`}
//                             element={el}
//                             style={{
//                                 gridColumn: el.gridColumn,
//                                 gridRow: el.gridRow,
//                             }}
//                         />
//                     )
//                 )}
//             </TableGrid>
//             <GroupLegend>
//                 <div className="alkali">Alkali metals</div>
//                 <div className="alkaline">Alkaline earth metals</div>
//                 <div className="transition">Transition metals</div>
//                 <div className="post-transition">Post-transition metals</div>
//                 <div className="metalloids">Metalloids</div>
//                 <div className="nonmetals">Reactive non-metals</div>
//                 <div className="noble">Noble gases</div>
//                 <div className="lanthanides">Lanthanides</div>
//                 <div className="actinides">Actinides</div>
//             </GroupLegend>
//         </Wrapper>
//     );
// };

// export default App;

import React from "react";
import { Wrapper, TableGrid, GroupLegend } from "./styled";
import { periodicElements } from "./periodicElements";
import ElementBox from "./ElementBox";

const App = () => {
    const mainElements = periodicElements.filter(
        (el) =>
            el.type === "placeholder" ||
            (el.atomicNumber &&
                (el.atomicNumber < 57 ||
                    (el.atomicNumber > 71 && el.atomicNumber < 89) ||
                    el.atomicNumber > 103))
    );

    const lanthanides = periodicElements.filter(
        (el) => el.atomicNumber >= 57 && el.atomicNumber <= 71
    );

    const actinides = periodicElements.filter(
        (el) => el.atomicNumber >= 89 && el.atomicNumber <= 103
    );

    return (
        <Wrapper>
            <h1>Periodic Table</h1>

            {/* Main Table */}
            <TableGrid>
                {mainElements.map((el, i) =>
                    el.type === "placeholder" ? (
                        <div
                            key={`ph-${i}`}
                            style={{
                                gridColumn: el.gridColumn,
                                gridRow: el.gridRow,
                            }}
                        />
                    ) : (
                        <ElementBox
                            key={`el-${el.atomicNumber}`}
                            element={el}
                            style={{
                                gridColumn: el.gridColumn,
                                gridRow: el.gridRow,
                            }}
                        />
                    )
                )}
            </TableGrid>

            {/* Lanthanides */}
            <h4 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
                Lanthanides
            </h4>
            <TableGrid
                style={{ gridTemplateColumns: "repeat(15, 60px)", gap: "4px" }}
            >
                {lanthanides.map((el) => (
                    <ElementBox key={`lan-${el.atomicNumber}`} element={el} />
                ))}
            </TableGrid>

            {/* Actinides */}
            <h4 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
                Actinides
            </h4>
            <TableGrid
                style={{ gridTemplateColumns: "repeat(15, 60px)", gap: "4px" }}
            >
                {actinides.map((el) => (
                    <ElementBox key={`act-${el.atomicNumber}`} element={el} />
                ))}
            </TableGrid>

            <GroupLegend>
                <div className="alkali">Alkali metals</div>
                <div className="alkaline">Alkaline earth metals</div>
                <div className="transition">Transition metals</div>
                <div className="post-transition">Post-transition metals</div>
                <div className="metalloids">Metalloids</div>
                <div className="nonmetals">Reactive non-metals</div>
                <div className="noble">Noble gases</div>
                <div className="lanthanides">Lanthanides</div>
                <div className="actinides">Actinides</div>
            </GroupLegend>
        </Wrapper>
    );
};

export default App;
