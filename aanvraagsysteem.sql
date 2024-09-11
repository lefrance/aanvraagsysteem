-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2022 at 11:25 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aanvraagsysteem`
--

-- --------------------------------------------------------

--
-- Table structure for table `aanvraag`
--

CREATE TABLE `aanvraag` (
  `aanvraagID` int(6) UNSIGNED NOT NULL,
  `omgevingStatus` varchar(30) NOT NULL,
  `notaNummer` varchar(30) DEFAULT NULL,
  `dienst` varchar(30) NOT NULL,
  `toestelnummer` int(9) DEFAULT NULL,
  `debiteurenId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `debiteuren`
--

CREATE TABLE `debiteuren` (
  `debituerenId` int(12) UNSIGNED NOT NULL,
  `naam` varchar(30) NOT NULL,
  `voornaam` varchar(30) NOT NULL,
  `idcard` varchar(10) NOT NULL,
  `straatnaam` varchar(30) NOT NULL,
  `huisnummer` int(10) NOT NULL,
  `debiteurennummer` varchar(10) NOT NULL,
  `imei` varchar(30) NOT NULL,
  `toestelnummer` varchar(10) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `factuur` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `debiteuren`
--

INSERT INTO `debiteuren` (`debituerenId`, `naam`, `voornaam`, `idcard`, `straatnaam`, `huisnummer`, `debiteurennummer`, `imei`, `toestelnummer`, `email`, `reg_date`, `factuur`) VALUES
(1, 'john', 'doe', 'FG00M0233M', 'ROOSSTRAAT', 7, '123456789', '12234444', '8642954', 'JOHNDOE@GMAIL.COM', '2022-04-07 00:04:40', 0),
(2, 'jane', 'doe', 'FG00M0133M', 'KERSSTRAAT', 9, '123456779', '12234454', '8642924', 'JANEDOE@GMAIL.COM', '2022-04-07 00:04:40', 0),
(3, 'qdqw', 'wqwq', 'ddddad', 'asas', 1, '12', '1222', '111', 'wqwq', '2022-04-07 06:25:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `omgeving`
--

CREATE TABLE `omgeving` (
  `omgevingId` int(6) UNSIGNED NOT NULL,
  `omgevingNaam` varchar(30) NOT NULL,
  `omgevingStatus` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `omgeving`
--

INSERT INTO `omgeving` (`omgevingId`, `omgevingNaam`, `omgevingStatus`) VALUES
(1, 'Paramaribo', 'bezet'),
(2, 'wanica', 'open');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Userid` int(5) NOT NULL,
  `Voornaam` text NOT NULL,
  `Achternaam` text NOT NULL,
  `gebruikersnaam` text NOT NULL,
  `afdeling` text NOT NULL,
  `badge` int(5) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Userid`, `Voornaam`, `Achternaam`, `gebruikersnaam`, `afdeling`, `badge`, `password`) VALUES
(1, 'raoul', 'fransman', 'raofra', 'ns&m', 19020, 'R@ou5lR@ou5l'),
(2, 'a', 'a', 'a', 'a', 1, 'a'),
(3, '', '', '', '', 0, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aanvraag`
--
ALTER TABLE `aanvraag`
  ADD PRIMARY KEY (`aanvraagID`),
  ADD UNIQUE KEY `debiteurenId` (`debiteurenId`);

--
-- Indexes for table `debiteuren`
--
ALTER TABLE `debiteuren`
  ADD PRIMARY KEY (`debituerenId`);

--
-- Indexes for table `omgeving`
--
ALTER TABLE `omgeving`
  ADD PRIMARY KEY (`omgevingId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `aanvraag`
--
ALTER TABLE `aanvraag`
  MODIFY `aanvraagID` int(6) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `debiteuren`
--
ALTER TABLE `debiteuren`
  MODIFY `debituerenId` int(12) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `omgeving`
--
ALTER TABLE `omgeving`
  MODIFY `omgevingId` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Userid` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
