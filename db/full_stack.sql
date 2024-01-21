-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Gen 21, 2024 alle 16:29
-- Versione del server: 10.4.28-MariaDB
-- Versione PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `full_stack`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `marker`
--

CREATE TABLE `marker` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `consent` tinyint(1) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(1) NOT NULL,
  `position` varchar(65) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `marker`
--

INSERT INTO `marker` (`id`, `user_id`, `consent`, `description`, `icon`, `position`) VALUES
(1, 1, 1, 'COMUNE: Centro Emergenza', 'B', '{\"lat\":43.847280470515386,\"lng\":10.979824691635285}'),
(2, 73, 1, 'Necessito di acqua', 'R', '{\"lat\":43.86696025056502,\"lng\":10.990526151853501}'),
(3, 2, 1, 'Polo Tecnologico\nCentro per distribuzione offerte', 'O', '{\"lat\":43.846582119200875,\"lng\":10.976995236750454}'),
(4, 2, 1, 'ROTTURA ARGINE\n02/11/2023', 'O', '{\"lat\":43.85291980533351,\"lng\":11.007663196762433}'),
(5, 2, 1, 'ROTTURA ARGINE\n04/11/2023', 'O', '{\"lat\":43.85289108397715,\"lng\":11.007724887569776}'),
(6, 3, 1, 'Messa in sicurezza Torrente Stella', 'Y', '{\"lat\":43.86228275588682,\"lng\":10.987820308156596}'),
(7, 3, 1, 'Distribuzione Sacchi di sabbia', 'Y', '{\"lat\":43.84758488460379,\"lng\":10.977649297638106}'),
(8, 1, 1, 'STRADA CHIUSA', 'B', '{\"lat\":43.859479517451106,\"lng\":10.999827891615297}'),
(9, 73, 0, 'Servono idrovore per mettere in sicurezza le case', 'R', '{\"lat\":43.867658354363655,\"lng\":10.991152470710599}'),
(11, 73, 1, 'Sacchi di sabbia', 'R', '{\"lat\":43.866327949853954,\"lng\":10.991387064644798}'),
(14, 1, 1, 'Autobotte - Acqua potabile', 'B', '{\"lat\":43.85604900387426,\"lng\":10.982690914190622}'),
(26, 1, 1, 'Deposito Rifiuti', 'B', '{\"lat\":43.857964451103676,\"lng\":10.962474314480284}'),
(114, 73, 1, 'Offro\nPasto caldo\nCoperte', 'G', '{\"lat\":43.84776681817707,\"lng\":10.970812332660822}'),
(115, 73, 0, 'Servono volontari per spalare il fango\nRitrovo 03/11/23 ore 8.00\nPer info chiamare 123456789', 'R', '{\"lat\":43.84501628894877,\"lng\":10.976974388990696}'),
(116, 73, 1, 'Idrovore per liberare cantine', 'R', '{\"lat\":43.845924566332506,\"lng\":10.977586881061118}'),
(117, 73, 0, 'Metto a disposizione furgone, chiamare 12345678', 'G', '{\"lat\":43.8480597939049,\"lng\":10.977472376502083}'),
(118, 73, 1, 'Pasti caldi per alluvionati', 'G', '{\"lat\":43.8758990378466,\"lng\":10.979415626724899}'),
(119, 73, 0, 'Idrovore\nvolontari\nsecchi\nstracci', 'R', '{\"lat\":43.85267629038805,\"lng\":11.007778968793076}'),
(120, 73, 0, 'Pasti caldi\nacqua', 'R', '{\"lat\":43.846627133856764,\"lng\":11.013126371780086}');

-- --------------------------------------------------------

--
-- Struttura della tabella `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `registration_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `user`
--

INSERT INTO `user` (`id`, `name`, `mobile`, `email`, `password`, `registration_date`) VALUES
(1, 'Comune di Quarrata', '0573 7710', 'comune.quarrata@postacert.toscana.it', '$2a$10$7U2T66/a6w9K1v3ROol6CeRJTnoHS9tUfY0cHRHFQ2KGPh6yrNOkG', '2023-11-26 16:56:43'),
(2, 'Protezione Civile', '055 438 2111', 'volontariato.protezionecivile@regione.toscana.it', '$2a$10$7U2T66/a6w9K1v3ROol6CeRJTnoHS9tUfY0cHRHFQ2KGPh6yrNOkG', '2024-01-04 15:38:46'),
(3, 'Regione Toscana', '055 438 2111', 'regionetoscana@postacert.toscana.it', '$2a$10$7U2T66/a6w9K1v3ROol6CeRJTnoHS9tUfY0cHRHFQ2KGPh6yrNOkG', '2024-01-04 15:38:46'),
(73, 'Marco Campominosi', '330 1234567', 'marco.campominosi@gmail.com', '$2a$10$7U2T66/a6w9K1v3ROol6CeRJTnoHS9tUfY0cHRHFQ2KGPh6yrNOkG', '2023-11-26 16:56:43');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `marker`
--
ALTER TABLE `marker`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_User_Marker` (`user_id`);

--
-- Indici per le tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mail` (`email`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `marker`
--
ALTER TABLE `marker`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT per la tabella `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `marker`
--
ALTER TABLE `marker`
  ADD CONSTRAINT `FK_User_Marker` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
