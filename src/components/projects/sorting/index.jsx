import { useState } from "react";
import { DetailsWrapper, Heading, Info, ListWrapper, Main, Wrapper } from "./styled";
import BubbleSortVisualizer from "./BubbleSortVisualizer";
import QuickSortVisualizer from "./QuickSortVisualizer";
import MergeSortVisualizer from "./MergeSortVisualizer";
import InsertionSortVisualizer from "./InsertionSortVisualizer";
import SelectionSortVisualizer from "./SelectionSortVisualizer"; // ⬅️ Add this
import AStarVisualizer from "./AStarVisualizer";
import HeapSortVisualizer from "./HeapSortVisualizer";
import LinearSearchVisualizer from "./LinearSearchVisualizer";
import RadixSortVisualizer from "./RadixSortVisualizer";
import ShellSortVisualizer from "./ShellSortVisualizer";
import CountingSortVisualizer from "./CountingSortVisualizer";

const Sorting = () => {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("");

    return (
        <Wrapper>
            <Heading>Sorting</Heading>
            <Info>Click on any sorting algo. below to visualize its working</Info>
            <Main>
                <ListWrapper>
                    <ul>
                        <li onClick={() => setSelectedAlgorithm("bubblesort")}>
                            Bubble Sort
                        </li>
                        <li onClick={() => setSelectedAlgorithm("quicksort")}>
                            Quick Sort
                        </li>
                        <li onClick={() => setSelectedAlgorithm("mergesort")}>
                            Merge Sort
                        </li>
                        <li
                            onClick={() =>
                                setSelectedAlgorithm("insertionsort")
                            }
                        >
                            Insertion Sort
                        </li>
                        <li
                            onClick={() =>
                                setSelectedAlgorithm("selectionsort")
                            }
                        >
                            Selection Sort
                        </li>
                        <li onClick={() => setSelectedAlgorithm("astar")}>
                            A* Search
                        </li>
                        <li onClick={() => setSelectedAlgorithm("heapsort")}>
                            Heap Sort
                        </li>
                        <li
                            onClick={() => setSelectedAlgorithm("linearsearch")}
                        >
                            Linear Search
                        </li>
                        <li onClick={() => setSelectedAlgorithm("radixsort")}>
                            Radix Sort
                        </li>
                        <li onClick={() => setSelectedAlgorithm("shellsort")}>
                            Shell Sort
                        </li>
                        <li
                            onClick={() => setSelectedAlgorithm("countingsort")}
                        >
                            Counting Sort
                        </li>
                    </ul>
                </ListWrapper>

                <DetailsWrapper>
                    {selectedAlgorithm === "bubblesort" && (
                        <BubbleSortVisualizer />
                    )}
                    {selectedAlgorithm === "quicksort" && (
                        <QuickSortVisualizer />
                    )}
                    {selectedAlgorithm === "mergesort" && (
                        <MergeSortVisualizer />
                    )}
                    {selectedAlgorithm === "insertionsort" && (
                        <InsertionSortVisualizer />
                    )}
                    {selectedAlgorithm === "selectionsort" && (
                        <SelectionSortVisualizer />
                    )}
                    {selectedAlgorithm === "astar" && <AStarVisualizer />}
                    {selectedAlgorithm === "heapsort" && <HeapSortVisualizer />}
                    {selectedAlgorithm === "linearsearch" && (
                        <LinearSearchVisualizer />
                    )}
                    {selectedAlgorithm === "radixsort" && (
                        <RadixSortVisualizer />
                    )}
                    {selectedAlgorithm === "shellsort" && (
                        <ShellSortVisualizer />
                    )}
                    {selectedAlgorithm === "countingsort" && (
                        <CountingSortVisualizer />
                    )}
                </DetailsWrapper>
            </Main>
        </Wrapper>
    );
};

export default Sorting;
