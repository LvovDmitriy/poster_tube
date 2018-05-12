-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2018 at 11:14 AM
-- Server version: 5.5.25
-- PHP Version: 5.2.12

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `poster`
--

-- --------------------------------------------------------

--
-- Table structure for table `video`
--

CREATE TABLE IF NOT EXISTS `video` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `video_path` varchar(100) NOT NULL,
  `img_path` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `duration` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=26 ;

--
-- Dumping data for table `video`
--

INSERT INTO `video` (`id`, `name`, `video_path`, `img_path`, `category`, `duration`) VALUES
(1, 'Scary LEGO monster', '1.ogv', '1.jpg', 'Lego', '0:05'),
(2, ' LEGO Jurassic World', '2.mp4', '2.jpg', 'Lego', '0:54'),
(3, 'LEGO Marvel Super Heroes', '3.mp4', '3.jpg', 'Lego', '1:07'),
(4, 'Hulk Goes Shopping LEGO', '4.mp4', '4.jpg', 'Lego', '0:35'),
(5, 'VENOM - Official Trailer', '5.mp4', '5.jpg', 'Trailer', '2:43'),
(6, 'Deadpool 2- The Final Trailer', '6.mp4', '6.jpg', 'Trailer', '2:23'),
(7, 'THE EQUALIZER 2 - Official Trailer', '7.mp4', '7.jpg', 'Trailer', '2:43'),
(8, 'The Meg Official Trailer', '8.mp4', '8.jpg', 'Trailer', '2:43'),
(9, 'ANT-MAN AND THE WASP Trailer', '9.mp4', '9.jpg', 'Trailer', '2:34'),
(10, 'Jaguar Hunting Crocodile', '10.mp4', '10.jpg', 'Animals', '2:31'),
(11, 'Tiger VS Lion', '11.mp4', '11.jpg', 'Animals', '3:42'),
(12, 'Dogs 101- Shiba Inu', '12.mp4', '12.jpg', 'Animals', '3:45'),
(13, 'Cats 101 - Siberian', '13.mp4', '13.jpg', 'Animals', '2:48'),
(14, 'Cats 101- Ragamuffin', '14.mp4', '14.jpg', 'Animals', '2:57'),
(15, 'An Inseparable Trio', '15.mp4', '15.jpg', 'Animals', '3:34'),
(16, 'The Weeknd - Reminder', '16.mp4', '16.jpg', 'Music', '3:50'),
(17, 'Michael Jackson - Beat It', '17.mp4', '17.jpg', 'Music', '4:58'),
(18, 'Disturbed  - The Sound Of Silence', '18.mp4', '18.jpg', 'Music', '4:19'),
(19, 'Ice Cube - It Was A Good Day', '19.mp4', '19.jpg', 'Music', '5:12'),
(20, 'Zara Larsson - Ain''t My Fault', '20.mp4', '20.jpg', 'Music', '3:43'),
(21, '10 Best Shots at Madrid Open', '21.mp4', '21.jpg', 'Tennis', '3:57'),
(22, 'Top 20 Shots from April 2018', '22.mp4', '22.jpg', 'Tennis', '5:38'),
(23, 'Ronaldo 2018 Best Goals', '23.mp4', '23.jpg', 'Football', '3:37'),
(24, 'ElClásico- Messi vs Cristiano Ronaldo', '24.mp4', '24.jpg', 'Football', '5:10'),
(25, 'Paul Pogba French Genius', '25.mp4', '25.jpg', 'Football', '4:55');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
