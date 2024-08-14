--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

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

--
-- Name: fee_category; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.fee_category AS ENUM (
    'Phí cố định',
    'Phí biến đổi'
);


ALTER TYPE public.fee_category OWNER TO postgres;

--
-- Name: fee_category_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.fee_category_enum AS ENUM (
    'Phí cố định',
    'Định kỳ',
    'Phân tầng',
    'phân chia doanh thu'
);


ALTER TYPE public.fee_category_enum OWNER TO postgres;

--
-- Name: fee_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.fee_type AS ENUM (
    'Cố định',
    'Tỷ lệ phần trăm'
);


ALTER TYPE public.fee_type OWNER TO postgres;

--
-- Name: fee_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.fee_type_enum AS ENUM (
    'cố định',
    'tùy biến'
);


ALTER TYPE public.fee_type_enum OWNER TO postgres;

--
-- Name: payment_method; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.payment_method AS ENUM (
    'Chuyển khoản',
    'Thanh toán qua thẻ tín dụng',
    'Ví điện tử'
);


ALTER TYPE public.payment_method OWNER TO postgres;

--
-- Name: payment_method_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.payment_method_enum AS ENUM (
    'Chuyển khoản',
    'Thanh toán qua thẻ tín dụng',
    'Ví điện từ'
);


ALTER TYPE public.payment_method_enum OWNER TO postgres;

--
-- Name: subject; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.subject AS ENUM (
    'Người cung cấp',
    'Khách hàng'
);


ALTER TYPE public.subject OWNER TO postgres;

--
-- Name: subject_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.subject_enum AS ENUM (
    'NCC',
    'Khách hàng'
);


ALTER TYPE public.subject_enum OWNER TO postgres;

--
-- Name: value_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.value_type AS ENUM (
    'VNĐ',
    'USD',
    '%'
);


ALTER TYPE public.value_type OWNER TO postgres;

--
-- Name: value_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.value_type_enum AS ENUM (
    'VNĐ',
    '%'
);


ALTER TYPE public.value_type_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: fees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fees (
    id bigint NOT NULL,
    subject character varying(255) NOT NULL,
    fee_name character varying(50) NOT NULL,
    fee_code character varying(255) NOT NULL,
    payment_method character varying(255) NOT NULL,
    description character varying(1000),
    isactive boolean DEFAULT true,
    fee_type character varying(255) NOT NULL,
    fee_category character varying(255) NOT NULL,
    fee_value numeric(38,2) NOT NULL,
    value_type character varying(255) NOT NULL,
    is_active boolean
);


ALTER TABLE public.fees OWNER TO postgres;

--
-- Name: fees_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.fees_id_seq OWNER TO postgres;

--
-- Name: fees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fees_id_seq OWNED BY public.fees.id;


--
-- Name: registration; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.registration (
    id bigint NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    reset_token character varying(255)
);


ALTER TABLE public.registration OWNER TO postgres;

--
-- Name: registration_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.registration_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.registration_id_seq OWNER TO postgres;

--
-- Name: registration_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.registration_id_seq OWNED BY public.registration.id;


--
-- Name: fees id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fees ALTER COLUMN id SET DEFAULT nextval('public.fees_id_seq'::regclass);


--
-- Name: registration id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registration ALTER COLUMN id SET DEFAULT nextval('public.registration_id_seq'::regclass);


--
-- Data for Name: fees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fees (id, subject, fee_name, fee_code, payment_method, description, isactive, fee_type, fee_category, fee_value, value_type, is_active) FROM stdin;
8	KHACH_HANG	Mobile Phone Service	FE372197	VI_DIEN_TU	A fee for processing payments for mobile phone.	t	TUY_BIEN	DINH_KY	146.00	VND	f
9	KHACH_HANG	Mechanical Service	FE252075	THANH_TOAN_QUA_THE_TIN_DUNG	A fee for processing payments for mechanic.	t	TUY_BIEN	DINH_KY	50000.00	VND	f
\.


--
-- Data for Name: registration; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.registration (id, username, password, reset_token) FROM stdin;
12	testUser@gmail.com	$2a$10$bn.S49sKKO7evX3cc2H7mOpU9ZnI.ISqm3aKwx7nahFyGCg2aCAWi	c8e93173-fd3b-4960-888a-47abf9c4154e
\.


--
-- Name: fees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fees_id_seq', 9, true);


--
-- Name: registration_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.registration_id_seq', 12, true);


--
-- Name: fees fees_fee_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fees
    ADD CONSTRAINT fees_fee_code_key UNIQUE (fee_code);


--
-- Name: fees fees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fees
    ADD CONSTRAINT fees_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

