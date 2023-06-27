--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

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
-- Name: CLIENTES; Type: TABLE; Schema: public; Owner: jason
--

CREATE TABLE public."CLIENTES" (
    "Id" integer NOT NULL,
    "Nombre" character varying(100) NOT NULL,
    "Email" character varying(100) NOT NULL,
    "Password" character varying NOT NULL,
    "FechaAlta" date NOT NULL,
    "FechaBaja" date
);


ALTER TABLE public."CLIENTES" OWNER TO jason;

--
-- Name: CLIENTES_Id_seq; Type: SEQUENCE; Schema: public; Owner: jason
--

ALTER TABLE public."CLIENTES" ALTER COLUMN "Id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."CLIENTES_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: LINEAS_PEDIDOS; Type: TABLE; Schema: public; Owner: jason
--

CREATE TABLE public."LINEAS_PEDIDOS" (
    "Id" integer NOT NULL,
    "IdPedido" integer NOT NULL,
    "IdProducto" integer NOT NULL,
    "Cantidad" integer NOT NULL,
    "ImporteUnitario" numeric(18,0) NOT NULL
);


ALTER TABLE public."LINEAS_PEDIDOS" OWNER TO jason;

--
-- Name: LINEAS_PEDIDO_Id_seq; Type: SEQUENCE; Schema: public; Owner: jason
--

ALTER TABLE public."LINEAS_PEDIDOS" ALTER COLUMN "Id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."LINEAS_PEDIDO_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: PEDIDOS; Type: TABLE; Schema: public; Owner: jason
--

CREATE TABLE public."PEDIDOS" (
    "Id" integer NOT NULL,
    "IdCliente" integer NOT NULL,
    "Total" numeric(18,0) NOT NULL,
    "FechaPedido" date NOT NULL
);


ALTER TABLE public."PEDIDOS" OWNER TO jason;

--
-- Name: PRODUCTOS; Type: TABLE; Schema: public; Owner: jason
--

CREATE TABLE public."PRODUCTOS" (
    "Id" integer NOT NULL,
    "Nombre" character varying(500) NOT NULL,
    "Precio" numeric(18,2) NOT NULL,
    "Descripcion" character varying(1000) NOT NULL
);


ALTER TABLE public."PRODUCTOS" OWNER TO jason;

--
-- Name: PRODUCTOS_Id_seq; Type: SEQUENCE; Schema: public; Owner: jason
--

ALTER TABLE public."PRODUCTOS" ALTER COLUMN "Id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."PRODUCTOS_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: USUARIOS_API; Type: TABLE; Schema: public; Owner: jason
--

CREATE TABLE public."USUARIOS_API" (
    "Id" integer NOT NULL,
    "Email" character varying(255) NOT NULL,
    "Password" character varying(500) NOT NULL,
    "FechaAlta" date NOT NULL,
    "FechaBaja" date NOT NULL,
    "Activo" boolean DEFAULT true
);


ALTER TABLE public."USUARIOS_API" OWNER TO jason;

--
-- Name: untitled_table_Id_seq; Type: SEQUENCE; Schema: public; Owner: jason
--

ALTER TABLE public."PEDIDOS" ALTER COLUMN "Id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."untitled_table_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: usuarios_api_id_seq; Type: SEQUENCE; Schema: public; Owner: jason
--

CREATE SEQUENCE public.usuarios_api_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_api_id_seq OWNER TO jason;

--
-- Name: usuarios_api_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jason
--

ALTER SEQUENCE public.usuarios_api_id_seq OWNED BY public."USUARIOS_API"."Id";


--
-- Name: USUARIOS_API Id; Type: DEFAULT; Schema: public; Owner: jason
--

ALTER TABLE ONLY public."USUARIOS_API" ALTER COLUMN "Id" SET DEFAULT nextval('public.usuarios_api_id_seq'::regclass);


--
-- Name: CLIENTES CLIENTES_Email_key; Type: CONSTRAINT; Schema: public; Owner: jason
--

ALTER TABLE ONLY public."CLIENTES"
    ADD CONSTRAINT "CLIENTES_Email_key" UNIQUE ("Email");


--
-- Name: CLIENTES CLIENTES_pkey; Type: CONSTRAINT; Schema: public; Owner: jason
--

ALTER TABLE ONLY public."CLIENTES"
    ADD CONSTRAINT "CLIENTES_pkey" PRIMARY KEY ("Id");


--
-- Name: LINEAS_PEDIDOS LINEAS_PEDIDO_pkey; Type: CONSTRAINT; Schema: public; Owner: jason
--

ALTER TABLE ONLY public."LINEAS_PEDIDOS"
    ADD CONSTRAINT "LINEAS_PEDIDO_pkey" PRIMARY KEY ("Id");


--
-- Name: PRODUCTOS PRODUCTOS_pkey; Type: CONSTRAINT; Schema: public; Owner: jason
--

ALTER TABLE ONLY public."PRODUCTOS"
    ADD CONSTRAINT "PRODUCTOS_pkey" PRIMARY KEY ("Id");


--
-- Name: PEDIDOS pk_Id_PEDIDOS; Type: CONSTRAINT; Schema: public; Owner: jason
--

ALTER TABLE ONLY public."PEDIDOS"
    ADD CONSTRAINT "pk_Id_PEDIDOS" PRIMARY KEY ("Id");


--
-- Name: USUARIOS_API usuarios_api_email_key; Type: CONSTRAINT; Schema: public; Owner: jason
--

ALTER TABLE ONLY public."USUARIOS_API"
    ADD CONSTRAINT usuarios_api_email_key UNIQUE ("Email");


--
-- Name: USUARIOS_API usuarios_api_pkey; Type: CONSTRAINT; Schema: public; Owner: jason
--

ALTER TABLE ONLY public."USUARIOS_API"
    ADD CONSTRAINT usuarios_api_pkey PRIMARY KEY ("Id");


--
-- Name: LINEAS_PEDIDOS FK_LINEAS_PEDIDOS_LINEAS_PEDIDOS; Type: FK CONSTRAINT; Schema: public; Owner: jason
--

ALTER TABLE ONLY public."LINEAS_PEDIDOS"
    ADD CONSTRAINT "FK_LINEAS_PEDIDOS_LINEAS_PEDIDOS" FOREIGN KEY ("IdPedido") REFERENCES public."PEDIDOS"("Id") NOT VALID;


--
-- Name: LINEAS_PEDIDOS FK_LINEAS_PEDIDOS_LINEAS_PRODUCTOS; Type: FK CONSTRAINT; Schema: public; Owner: jason
--

ALTER TABLE ONLY public."LINEAS_PEDIDOS"
    ADD CONSTRAINT "FK_LINEAS_PEDIDOS_LINEAS_PRODUCTOS" FOREIGN KEY ("IdProducto") REFERENCES public."PRODUCTOS"("Id") NOT VALID;


--
-- PostgreSQL database dump complete
--

