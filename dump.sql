--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    name text NOT NULL,
    phone text NOT NULL,
    cpf character varying(11) NOT NULL,
    birthday date NOT NULL
);


--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: games; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.games (
    id integer NOT NULL,
    name text NOT NULL,
    image text NOT NULL,
    "stockTotal" integer NOT NULL,
    "categoryId" integer NOT NULL,
    "pricePerDay" integer NOT NULL
);


--
-- Name: games_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.games_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: games_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.games_id_seq OWNED BY public.games.id;


--
-- Name: rentals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rentals (
    id integer NOT NULL,
    "customerId" integer NOT NULL,
    "gameId" integer NOT NULL,
    "rentDate" date NOT NULL,
    "daysRented" integer NOT NULL,
    "returnDate" date,
    "originalPrice" integer NOT NULL,
    "delayFee" integer
);


--
-- Name: rentals_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.rentals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: rentals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.rentals_id_seq OWNED BY public.rentals.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: games id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.games ALTER COLUMN id SET DEFAULT nextval('public.games_id_seq'::regclass);


--
-- Name: rentals id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rentals ALTER COLUMN id SET DEFAULT nextval('public.rentals_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.categories VALUES (1, 'Estratégia');
INSERT INTO public.categories VALUES (3, 'Investigação');
INSERT INTO public.categories VALUES (6, 'Sorte');
INSERT INTO public.categories VALUES (7, 'Detetive');


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.customers VALUES (1, 'Minerva', '1234567890', '12345678900', '2019-09-26');
INSERT INTO public.customers VALUES (2, 'Molly', '1234567890', '12345678902', '2019-09-26');
INSERT INTO public.customers VALUES (4, 'Aurora', '1234567890', '00000000020', '2021-04-23');
INSERT INTO public.customers VALUES (3, 'Alvo Louis Dumbledore', '1234567890', '00000000000', '2020-03-23');
INSERT INTO public.customers VALUES (6, 'Sininho', '1234567890', '00000000050', '2010-11-23');


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.games VALUES (1, 'Banco Imobiliário', 'http://', 3, 1, 1500);
INSERT INTO public.games VALUES (4, 'Detetive', 'http://', 3, 3, 2000);
INSERT INTO public.games VALUES (5, 'UNO', '7', 20, 3, 1100);


--
-- Data for Name: rentals; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.rentals VALUES (6, 1, 4, '2021-06-18', 3, NULL, 6000, NULL);
INSERT INTO public.rentals VALUES (7, 1, 4, '2021-06-18', 3, NULL, 6000, NULL);
INSERT INTO public.rentals VALUES (5, 1, 4, '2021-06-18', 3, '2021-06-18', 6000, 0);
INSERT INTO public.rentals VALUES (8, 1, 4, '2021-06-18', 3, NULL, 6000, NULL);
INSERT INTO public.rentals VALUES (9, 2, 5, '2021-06-18', 2, NULL, 2200, NULL);
INSERT INTO public.rentals VALUES (10, 2, 5, '2021-06-18', 2, NULL, 2200, NULL);
INSERT INTO public.rentals VALUES (11, 2, 5, '2021-06-18', 2, NULL, 2200, NULL);
INSERT INTO public.rentals VALUES (2, 1, 1, '2021-06-18', 3, '2021-06-18', 4500, 0);
INSERT INTO public.rentals VALUES (12, 2, 5, '2021-06-18', 2, NULL, 2200, NULL);
INSERT INTO public.rentals VALUES (3, 1, 1, '2021-06-18', 3, '2021-06-18', 4500, 0);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 7, true);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.customers_id_seq', 6, true);


--
-- Name: games_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.games_id_seq', 5, true);


--
-- Name: rentals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.rentals_id_seq', 12, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);


--
-- Name: rentals rentals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rentals
    ADD CONSTRAINT rentals_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

