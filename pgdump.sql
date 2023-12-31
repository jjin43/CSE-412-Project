PGDMP     (                    {            neondb    15.4    15.4 j    d
           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            e
           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            f
           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            g
           1262    16386    neondb    DATABASE     h   CREATE DATABASE neondb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE neondb;
             
   justinozzy    false            h
           0    0    DATABASE neondb    ACL     0   GRANT ALL ON DATABASE neondb TO neon_superuser;
                
   justinozzy    false    2663            �            1259    32800    bike    TABLE     L  CREATE TABLE public.bike (
    b_bike_serial_num integer NOT NULL,
    b_brand_name character varying(25) NOT NULL,
    b_wheel_size double precision NOT NULL,
    b_color character varying(35) NOT NULL,
    b_type character varying(35) NOT NULL,
    b_model character varying(35) NOT NULL,
    b_price double precision NOT NULL
);
    DROP TABLE public.bike;
       public         heap 
   justinozzy    false            �            1259    32799    bike_b_bike_serial_num_seq    SEQUENCE     �   CREATE SEQUENCE public.bike_b_bike_serial_num_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.bike_b_bike_serial_num_seq;
       public       
   justinozzy    false    216            i
           0    0    bike_b_bike_serial_num_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.bike_b_bike_serial_num_seq OWNED BY public.bike.b_bike_serial_num;
          public       
   justinozzy    false    215            �            1259    32827    bike_inventory    TABLE     �   CREATE TABLE public.bike_inventory (
    bi_store_id integer NOT NULL,
    bi_bike_serial_num integer NOT NULL,
    bi_availqty integer DEFAULT 0
);
 "   DROP TABLE public.bike_inventory;
       public         heap 
   justinozzy    false            �            1259    32826 %   bike_inventory_bi_bike_serial_num_seq    SEQUENCE     �   CREATE SEQUENCE public.bike_inventory_bi_bike_serial_num_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public.bike_inventory_bi_bike_serial_num_seq;
       public       
   justinozzy    false    223            j
           0    0 %   bike_inventory_bi_bike_serial_num_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public.bike_inventory_bi_bike_serial_num_seq OWNED BY public.bike_inventory.bi_bike_serial_num;
          public       
   justinozzy    false    222            �            1259    32825    bike_inventory_bi_store_id_seq    SEQUENCE     �   CREATE SEQUENCE public.bike_inventory_bi_store_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.bike_inventory_bi_store_id_seq;
       public       
   justinozzy    false    223            k
           0    0    bike_inventory_bi_store_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.bike_inventory_bi_store_id_seq OWNED BY public.bike_inventory.bi_store_id;
          public       
   justinozzy    false    221            �            1259    32866    customer    TABLE     �   CREATE TABLE public.customer (
    c_customer_id integer NOT NULL,
    c_name character varying(50) NOT NULL,
    c_email character varying(50) NOT NULL,
    c_password character varying(255) NOT NULL,
    c_payment_method character varying(255)
);
    DROP TABLE public.customer;
       public         heap 
   justinozzy    false            �            1259    32865    customer_c_customer_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_c_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.customer_c_customer_id_seq;
       public       
   justinozzy    false    228            l
           0    0    customer_c_customer_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.customer_c_customer_id_seq OWNED BY public.customer.c_customer_id;
          public       
   justinozzy    false    227            �            1259    32794    manufacturer    TABLE     �   CREATE TABLE public.manufacturer (
    m_brand_name character varying(25) NOT NULL,
    m_nation character varying(35) NOT NULL,
    m_city character varying(35) NOT NULL,
    m_zip_code integer NOT NULL,
    m_state character varying(35)
);
     DROP TABLE public.manufacturer;
       public         heap 
   justinozzy    false            �            1259    32847    misc_inventory    TABLE     �   CREATE TABLE public.misc_inventory (
    iinv_store_id integer NOT NULL,
    iinv_item_id integer NOT NULL,
    iinv_availqty integer DEFAULT 0
);
 "   DROP TABLE public.misc_inventory;
       public         heap 
   justinozzy    false            �            1259    32846    misc_inventory_iinv_item_id_seq    SEQUENCE     �   CREATE SEQUENCE public.misc_inventory_iinv_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.misc_inventory_iinv_item_id_seq;
       public       
   justinozzy    false    226            m
           0    0    misc_inventory_iinv_item_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.misc_inventory_iinv_item_id_seq OWNED BY public.misc_inventory.iinv_item_id;
          public       
   justinozzy    false    225            �            1259    32845     misc_inventory_iinv_store_id_seq    SEQUENCE     �   CREATE SEQUENCE public.misc_inventory_iinv_store_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.misc_inventory_iinv_store_id_seq;
       public       
   justinozzy    false    226            n
           0    0     misc_inventory_iinv_store_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.misc_inventory_iinv_store_id_seq OWNED BY public.misc_inventory.iinv_store_id;
          public       
   justinozzy    false    224            �            1259    32812 
   misc_items    TABLE     �   CREATE TABLE public.misc_items (
    mi_item_id integer NOT NULL,
    mi_item_name character varying(100) NOT NULL,
    mi_item_price double precision NOT NULL
);
    DROP TABLE public.misc_items;
       public         heap 
   justinozzy    false            �            1259    32811    misc_items_mi_item_id_seq    SEQUENCE     �   CREATE SEQUENCE public.misc_items_mi_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.misc_items_mi_item_id_seq;
       public       
   justinozzy    false    218            o
           0    0    misc_items_mi_item_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.misc_items_mi_item_id_seq OWNED BY public.misc_items.mi_item_id;
          public       
   justinozzy    false    217            �            1259    41006    order_bike_items    TABLE     �   CREATE TABLE public.order_bike_items (
    obi_order_id integer NOT NULL,
    obi_bike_id integer NOT NULL,
    obi_quantity integer DEFAULT 0 NOT NULL
);
 $   DROP TABLE public.order_bike_items;
       public         heap 
   justinozzy    false            �            1259    41005     order_bike_items_obi_bike_id_seq    SEQUENCE     �   CREATE SEQUENCE public.order_bike_items_obi_bike_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.order_bike_items_obi_bike_id_seq;
       public       
   justinozzy    false    238            p
           0    0     order_bike_items_obi_bike_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.order_bike_items_obi_bike_id_seq OWNED BY public.order_bike_items.obi_bike_id;
          public       
   justinozzy    false    237            �            1259    41004 !   order_bike_items_obi_order_id_seq    SEQUENCE     �   CREATE SEQUENCE public.order_bike_items_obi_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.order_bike_items_obi_order_id_seq;
       public       
   justinozzy    false    238            q
           0    0 !   order_bike_items_obi_order_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.order_bike_items_obi_order_id_seq OWNED BY public.order_bike_items.obi_order_id;
          public       
   justinozzy    false    236            �            1259    40988    order_misc_items    TABLE     �   CREATE TABLE public.order_misc_items (
    omi_order_id integer NOT NULL,
    omi_item_id integer NOT NULL,
    omi_quantity integer DEFAULT 0 NOT NULL
);
 $   DROP TABLE public.order_misc_items;
       public         heap 
   justinozzy    false            �            1259    40987     order_misc_items_omi_item_id_seq    SEQUENCE     �   CREATE SEQUENCE public.order_misc_items_omi_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.order_misc_items_omi_item_id_seq;
       public       
   justinozzy    false    235            r
           0    0     order_misc_items_omi_item_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.order_misc_items_omi_item_id_seq OWNED BY public.order_misc_items.omi_item_id;
          public       
   justinozzy    false    234            �            1259    40986 !   order_misc_items_omi_order_id_seq    SEQUENCE     �   CREATE SEQUENCE public.order_misc_items_omi_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.order_misc_items_omi_order_id_seq;
       public       
   justinozzy    false    235            s
           0    0 !   order_misc_items_omi_order_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.order_misc_items_omi_order_id_seq OWNED BY public.order_misc_items.omi_order_id;
          public       
   justinozzy    false    233            �            1259    32877    orders    TABLE     �   CREATE TABLE public.orders (
    o_order_id integer NOT NULL,
    o_store_id integer NOT NULL,
    o_customer_id integer NOT NULL,
    o_payment_info character varying(500) NOT NULL,
    o_status character varying(35) NOT NULL
);
    DROP TABLE public.orders;
       public         heap 
   justinozzy    false            �            1259    32876    orders_o_customer_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_o_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.orders_o_customer_id_seq;
       public       
   justinozzy    false    232            t
           0    0    orders_o_customer_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.orders_o_customer_id_seq OWNED BY public.orders.o_customer_id;
          public       
   justinozzy    false    231            �            1259    32874    orders_o_order_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_o_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.orders_o_order_id_seq;
       public       
   justinozzy    false    232            u
           0    0    orders_o_order_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.orders_o_order_id_seq OWNED BY public.orders.o_order_id;
          public       
   justinozzy    false    229            �            1259    32875    orders_o_store_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_o_store_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.orders_o_store_id_seq;
       public       
   justinozzy    false    232            v
           0    0    orders_o_store_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.orders_o_store_id_seq OWNED BY public.orders.o_store_id;
          public       
   justinozzy    false    230            �            1259    32819    store    TABLE     �   CREATE TABLE public.store (
    s_store_id integer NOT NULL,
    s_location character varying(100) NOT NULL,
    s_zip_code integer NOT NULL
);
    DROP TABLE public.store;
       public         heap 
   justinozzy    false            �            1259    32818    store_s_store_id_seq    SEQUENCE     �   CREATE SEQUENCE public.store_s_store_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.store_s_store_id_seq;
       public       
   justinozzy    false    220            w
           0    0    store_s_store_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.store_s_store_id_seq OWNED BY public.store.s_store_id;
          public       
   justinozzy    false    219            �	           2604    32803    bike b_bike_serial_num    DEFAULT     �   ALTER TABLE ONLY public.bike ALTER COLUMN b_bike_serial_num SET DEFAULT nextval('public.bike_b_bike_serial_num_seq'::regclass);
 E   ALTER TABLE public.bike ALTER COLUMN b_bike_serial_num DROP DEFAULT;
       public       
   justinozzy    false    215    216    216            �	           2604    32830    bike_inventory bi_store_id    DEFAULT     �   ALTER TABLE ONLY public.bike_inventory ALTER COLUMN bi_store_id SET DEFAULT nextval('public.bike_inventory_bi_store_id_seq'::regclass);
 I   ALTER TABLE public.bike_inventory ALTER COLUMN bi_store_id DROP DEFAULT;
       public       
   justinozzy    false    223    221    223            �	           2604    32831 !   bike_inventory bi_bike_serial_num    DEFAULT     �   ALTER TABLE ONLY public.bike_inventory ALTER COLUMN bi_bike_serial_num SET DEFAULT nextval('public.bike_inventory_bi_bike_serial_num_seq'::regclass);
 P   ALTER TABLE public.bike_inventory ALTER COLUMN bi_bike_serial_num DROP DEFAULT;
       public       
   justinozzy    false    222    223    223            �	           2604    32869    customer c_customer_id    DEFAULT     �   ALTER TABLE ONLY public.customer ALTER COLUMN c_customer_id SET DEFAULT nextval('public.customer_c_customer_id_seq'::regclass);
 E   ALTER TABLE public.customer ALTER COLUMN c_customer_id DROP DEFAULT;
       public       
   justinozzy    false    227    228    228            �	           2604    32850    misc_inventory iinv_store_id    DEFAULT     �   ALTER TABLE ONLY public.misc_inventory ALTER COLUMN iinv_store_id SET DEFAULT nextval('public.misc_inventory_iinv_store_id_seq'::regclass);
 K   ALTER TABLE public.misc_inventory ALTER COLUMN iinv_store_id DROP DEFAULT;
       public       
   justinozzy    false    226    224    226            �	           2604    32851    misc_inventory iinv_item_id    DEFAULT     �   ALTER TABLE ONLY public.misc_inventory ALTER COLUMN iinv_item_id SET DEFAULT nextval('public.misc_inventory_iinv_item_id_seq'::regclass);
 J   ALTER TABLE public.misc_inventory ALTER COLUMN iinv_item_id DROP DEFAULT;
       public       
   justinozzy    false    225    226    226            �	           2604    32815    misc_items mi_item_id    DEFAULT     ~   ALTER TABLE ONLY public.misc_items ALTER COLUMN mi_item_id SET DEFAULT nextval('public.misc_items_mi_item_id_seq'::regclass);
 D   ALTER TABLE public.misc_items ALTER COLUMN mi_item_id DROP DEFAULT;
       public       
   justinozzy    false    218    217    218            �	           2604    41009    order_bike_items obi_order_id    DEFAULT     �   ALTER TABLE ONLY public.order_bike_items ALTER COLUMN obi_order_id SET DEFAULT nextval('public.order_bike_items_obi_order_id_seq'::regclass);
 L   ALTER TABLE public.order_bike_items ALTER COLUMN obi_order_id DROP DEFAULT;
       public       
   justinozzy    false    236    238    238            �	           2604    41010    order_bike_items obi_bike_id    DEFAULT     �   ALTER TABLE ONLY public.order_bike_items ALTER COLUMN obi_bike_id SET DEFAULT nextval('public.order_bike_items_obi_bike_id_seq'::regclass);
 K   ALTER TABLE public.order_bike_items ALTER COLUMN obi_bike_id DROP DEFAULT;
       public       
   justinozzy    false    238    237    238            �	           2604    40991    order_misc_items omi_order_id    DEFAULT     �   ALTER TABLE ONLY public.order_misc_items ALTER COLUMN omi_order_id SET DEFAULT nextval('public.order_misc_items_omi_order_id_seq'::regclass);
 L   ALTER TABLE public.order_misc_items ALTER COLUMN omi_order_id DROP DEFAULT;
       public       
   justinozzy    false    235    233    235            �	           2604    40992    order_misc_items omi_item_id    DEFAULT     �   ALTER TABLE ONLY public.order_misc_items ALTER COLUMN omi_item_id SET DEFAULT nextval('public.order_misc_items_omi_item_id_seq'::regclass);
 K   ALTER TABLE public.order_misc_items ALTER COLUMN omi_item_id DROP DEFAULT;
       public       
   justinozzy    false    235    234    235            �	           2604    32880    orders o_order_id    DEFAULT     v   ALTER TABLE ONLY public.orders ALTER COLUMN o_order_id SET DEFAULT nextval('public.orders_o_order_id_seq'::regclass);
 @   ALTER TABLE public.orders ALTER COLUMN o_order_id DROP DEFAULT;
       public       
   justinozzy    false    229    232    232            �	           2604    32881    orders o_store_id    DEFAULT     v   ALTER TABLE ONLY public.orders ALTER COLUMN o_store_id SET DEFAULT nextval('public.orders_o_store_id_seq'::regclass);
 @   ALTER TABLE public.orders ALTER COLUMN o_store_id DROP DEFAULT;
       public       
   justinozzy    false    232    230    232            �	           2604    32882    orders o_customer_id    DEFAULT     |   ALTER TABLE ONLY public.orders ALTER COLUMN o_customer_id SET DEFAULT nextval('public.orders_o_customer_id_seq'::regclass);
 C   ALTER TABLE public.orders ALTER COLUMN o_customer_id DROP DEFAULT;
       public       
   justinozzy    false    231    232    232            �	           2604    32822    store s_store_id    DEFAULT     t   ALTER TABLE ONLY public.store ALTER COLUMN s_store_id SET DEFAULT nextval('public.store_s_store_id_seq'::regclass);
 ?   ALTER TABLE public.store ALTER COLUMN s_store_id DROP DEFAULT;
       public       
   justinozzy    false    219    220    220            K
          0    32800    bike 
   TABLE DATA           p   COPY public.bike (b_bike_serial_num, b_brand_name, b_wheel_size, b_color, b_type, b_model, b_price) FROM stdin;
    public       
   justinozzy    false    216   ؃       R
          0    32827    bike_inventory 
   TABLE DATA           V   COPY public.bike_inventory (bi_store_id, bi_bike_serial_num, bi_availqty) FROM stdin;
    public       
   justinozzy    false    223   ��       W
          0    32866    customer 
   TABLE DATA           `   COPY public.customer (c_customer_id, c_name, c_email, c_password, c_payment_method) FROM stdin;
    public       
   justinozzy    false    228   ܈       I
          0    32794    manufacturer 
   TABLE DATA           [   COPY public.manufacturer (m_brand_name, m_nation, m_city, m_zip_code, m_state) FROM stdin;
    public       
   justinozzy    false    214   ω       U
          0    32847    misc_inventory 
   TABLE DATA           T   COPY public.misc_inventory (iinv_store_id, iinv_item_id, iinv_availqty) FROM stdin;
    public       
   justinozzy    false    226   s�       M
          0    32812 
   misc_items 
   TABLE DATA           M   COPY public.misc_items (mi_item_id, mi_item_name, mi_item_price) FROM stdin;
    public       
   justinozzy    false    218   D�       a
          0    41006    order_bike_items 
   TABLE DATA           S   COPY public.order_bike_items (obi_order_id, obi_bike_id, obi_quantity) FROM stdin;
    public       
   justinozzy    false    238   Ȍ       ^
          0    40988    order_misc_items 
   TABLE DATA           S   COPY public.order_misc_items (omi_order_id, omi_item_id, omi_quantity) FROM stdin;
    public       
   justinozzy    false    235   T�       [
          0    32877    orders 
   TABLE DATA           a   COPY public.orders (o_order_id, o_store_id, o_customer_id, o_payment_info, o_status) FROM stdin;
    public       
   justinozzy    false    232   ߍ       O
          0    32819    store 
   TABLE DATA           C   COPY public.store (s_store_id, s_location, s_zip_code) FROM stdin;
    public       
   justinozzy    false    220   �       x
           0    0    bike_b_bike_serial_num_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.bike_b_bike_serial_num_seq', 40, true);
          public       
   justinozzy    false    215            y
           0    0 %   bike_inventory_bi_bike_serial_num_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.bike_inventory_bi_bike_serial_num_seq', 1, false);
          public       
   justinozzy    false    222            z
           0    0    bike_inventory_bi_store_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.bike_inventory_bi_store_id_seq', 1, false);
          public       
   justinozzy    false    221            {
           0    0    customer_c_customer_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.customer_c_customer_id_seq', 19, true);
          public       
   justinozzy    false    227            |
           0    0    misc_inventory_iinv_item_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.misc_inventory_iinv_item_id_seq', 1, false);
          public       
   justinozzy    false    225            }
           0    0     misc_inventory_iinv_store_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.misc_inventory_iinv_store_id_seq', 1, false);
          public       
   justinozzy    false    224            ~
           0    0    misc_items_mi_item_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.misc_items_mi_item_id_seq', 24, true);
          public       
   justinozzy    false    217            
           0    0     order_bike_items_obi_bike_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.order_bike_items_obi_bike_id_seq', 1, false);
          public       
   justinozzy    false    237            �
           0    0 !   order_bike_items_obi_order_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.order_bike_items_obi_order_id_seq', 1, false);
          public       
   justinozzy    false    236            �
           0    0     order_misc_items_omi_item_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.order_misc_items_omi_item_id_seq', 1, false);
          public       
   justinozzy    false    234            �
           0    0 !   order_misc_items_omi_order_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.order_misc_items_omi_order_id_seq', 1, false);
          public       
   justinozzy    false    233            �
           0    0    orders_o_customer_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.orders_o_customer_id_seq', 1, false);
          public       
   justinozzy    false    231            �
           0    0    orders_o_order_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.orders_o_order_id_seq', 30, true);
          public       
   justinozzy    false    229            �
           0    0    orders_o_store_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.orders_o_store_id_seq', 1, false);
          public       
   justinozzy    false    230            �
           0    0    store_s_store_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.store_s_store_id_seq', 5, true);
          public       
   justinozzy    false    219            �	           2606    32834 "   bike_inventory bike_inventory_pkey 
   CONSTRAINT     }   ALTER TABLE ONLY public.bike_inventory
    ADD CONSTRAINT bike_inventory_pkey PRIMARY KEY (bi_store_id, bi_bike_serial_num);
 L   ALTER TABLE ONLY public.bike_inventory DROP CONSTRAINT bike_inventory_pkey;
       public         
   justinozzy    false    223    223            �	           2606    32805    bike bike_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.bike
    ADD CONSTRAINT bike_pkey PRIMARY KEY (b_bike_serial_num);
 8   ALTER TABLE ONLY public.bike DROP CONSTRAINT bike_pkey;
       public         
   justinozzy    false    216            �	           2606    32873    customer customer_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (c_customer_id);
 @   ALTER TABLE ONLY public.customer DROP CONSTRAINT customer_pkey;
       public         
   justinozzy    false    228            �	           2606    32798    manufacturer manufacturer_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.manufacturer
    ADD CONSTRAINT manufacturer_pkey PRIMARY KEY (m_brand_name);
 H   ALTER TABLE ONLY public.manufacturer DROP CONSTRAINT manufacturer_pkey;
       public         
   justinozzy    false    214            �	           2606    32854 "   misc_inventory misc_inventory_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY public.misc_inventory
    ADD CONSTRAINT misc_inventory_pkey PRIMARY KEY (iinv_store_id, iinv_item_id);
 L   ALTER TABLE ONLY public.misc_inventory DROP CONSTRAINT misc_inventory_pkey;
       public         
   justinozzy    false    226    226            �	           2606    32817    misc_items misc_items_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.misc_items
    ADD CONSTRAINT misc_items_pkey PRIMARY KEY (mi_item_id);
 D   ALTER TABLE ONLY public.misc_items DROP CONSTRAINT misc_items_pkey;
       public         
   justinozzy    false    218            �	           2606    49153 $   order_bike_items order_bike_items_pk 
   CONSTRAINT     y   ALTER TABLE ONLY public.order_bike_items
    ADD CONSTRAINT order_bike_items_pk PRIMARY KEY (obi_order_id, obi_bike_id);
 N   ALTER TABLE ONLY public.order_bike_items DROP CONSTRAINT order_bike_items_pk;
       public         
   justinozzy    false    238    238            �	           2606    49155 $   order_misc_items order_misc_items_pk 
   CONSTRAINT     y   ALTER TABLE ONLY public.order_misc_items
    ADD CONSTRAINT order_misc_items_pk PRIMARY KEY (omi_order_id, omi_item_id);
 N   ALTER TABLE ONLY public.order_misc_items DROP CONSTRAINT order_misc_items_pk;
       public         
   justinozzy    false    235    235            �	           2606    32886    orders orders_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (o_order_id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public         
   justinozzy    false    232            �	           2606    32824    store store_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.store
    ADD CONSTRAINT store_pkey PRIMARY KEY (s_store_id);
 :   ALTER TABLE ONLY public.store DROP CONSTRAINT store_pkey;
       public         
   justinozzy    false    220            �	           2606    32806    bike bike_b_brand_name_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.bike
    ADD CONSTRAINT bike_b_brand_name_fkey FOREIGN KEY (b_brand_name) REFERENCES public.manufacturer(m_brand_name);
 E   ALTER TABLE ONLY public.bike DROP CONSTRAINT bike_b_brand_name_fkey;
       public       
   justinozzy    false    216    2461    214            �	           2606    32840 5   bike_inventory bike_inventory_bi_bike_serial_num_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.bike_inventory
    ADD CONSTRAINT bike_inventory_bi_bike_serial_num_fkey FOREIGN KEY (bi_bike_serial_num) REFERENCES public.bike(b_bike_serial_num);
 _   ALTER TABLE ONLY public.bike_inventory DROP CONSTRAINT bike_inventory_bi_bike_serial_num_fkey;
       public       
   justinozzy    false    2463    216    223            �	           2606    32835 .   bike_inventory bike_inventory_bi_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.bike_inventory
    ADD CONSTRAINT bike_inventory_bi_store_id_fkey FOREIGN KEY (bi_store_id) REFERENCES public.store(s_store_id);
 X   ALTER TABLE ONLY public.bike_inventory DROP CONSTRAINT bike_inventory_bi_store_id_fkey;
       public       
   justinozzy    false    220    223    2467            �	           2606    32860 /   misc_inventory misc_inventory_iinv_item_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.misc_inventory
    ADD CONSTRAINT misc_inventory_iinv_item_id_fkey FOREIGN KEY (iinv_item_id) REFERENCES public.misc_items(mi_item_id);
 Y   ALTER TABLE ONLY public.misc_inventory DROP CONSTRAINT misc_inventory_iinv_item_id_fkey;
       public       
   justinozzy    false    2465    226    218            �	           2606    32855 0   misc_inventory misc_inventory_iinv_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.misc_inventory
    ADD CONSTRAINT misc_inventory_iinv_store_id_fkey FOREIGN KEY (iinv_store_id) REFERENCES public.store(s_store_id);
 Z   ALTER TABLE ONLY public.misc_inventory DROP CONSTRAINT misc_inventory_iinv_store_id_fkey;
       public       
   justinozzy    false    2467    226    220            �	           2606    41017 2   order_bike_items order_bike_items_obi_bike_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_bike_items
    ADD CONSTRAINT order_bike_items_obi_bike_id_fkey FOREIGN KEY (obi_bike_id) REFERENCES public.bike(b_bike_serial_num);
 \   ALTER TABLE ONLY public.order_bike_items DROP CONSTRAINT order_bike_items_obi_bike_id_fkey;
       public       
   justinozzy    false    2463    238    216            �	           2606    41012 3   order_bike_items order_bike_items_obi_order_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_bike_items
    ADD CONSTRAINT order_bike_items_obi_order_id_fkey FOREIGN KEY (obi_order_id) REFERENCES public.orders(o_order_id);
 ]   ALTER TABLE ONLY public.order_bike_items DROP CONSTRAINT order_bike_items_obi_order_id_fkey;
       public       
   justinozzy    false    232    238    2475            �	           2606    40999 2   order_misc_items order_misc_items_omi_item_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_misc_items
    ADD CONSTRAINT order_misc_items_omi_item_id_fkey FOREIGN KEY (omi_item_id) REFERENCES public.misc_items(mi_item_id);
 \   ALTER TABLE ONLY public.order_misc_items DROP CONSTRAINT order_misc_items_omi_item_id_fkey;
       public       
   justinozzy    false    235    2465    218            �	           2606    40994 3   order_misc_items order_misc_items_omi_order_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_misc_items
    ADD CONSTRAINT order_misc_items_omi_order_id_fkey FOREIGN KEY (omi_order_id) REFERENCES public.orders(o_order_id);
 ]   ALTER TABLE ONLY public.order_misc_items DROP CONSTRAINT order_misc_items_omi_order_id_fkey;
       public       
   justinozzy    false    235    232    2475            �	           2606    32892     orders orders_o_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_o_customer_id_fkey FOREIGN KEY (o_customer_id) REFERENCES public.customer(c_customer_id);
 J   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_o_customer_id_fkey;
       public       
   justinozzy    false    2473    232    228            �	           2606    32887    orders orders_o_store_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_o_store_id_fkey FOREIGN KEY (o_store_id) REFERENCES public.store(s_store_id);
 G   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_o_store_id_fkey;
       public       
   justinozzy    false    220    232    2467            K
   �  x���͒�6���)t�l�2��q0$3�ڐ�\4v�
aQ�a�G��ʋ�%��7��(�߿��j�p�R��x�}Hr������ź�b�d��d�JY��M�*׋��>I������#4��B���3�А��4��5X��Y��`1}X�$��-����:;Tg�Z0}�b���j.�aˆ�|h�H3(oF$n��d0U|Sˊ6���ZӔ�Ǻ&��N�s��t�J|����1���?�bm�|P�TVl��~�bx�ml+h�GE�xѦ�Y��X*9yb��6���m�g�W�K2Y�|+U���X�uNf3VrɊ�O4�c^�EI�-�	o^�
��گ=�܎�h�"�2�����n>�D��p�z�����I�����C��~7]���9��[�Q:���e�K��*yaN��˖d����j�I7� a����/B������$�O5}���Xz�>��<�t+��i[(5}ƹ2m�}����lhvѫK2_ �X2�$}ct"�mY�Q/"�5�ݿ����|��"�S��L9�7�šP��i&��;��;:8([���3�R�s?�x���s���{d�rW�@g���j:衟Ǔ�ם`�
.�L\Pcž��8��b{d���Jh%��� �xLJ��
d����7*�Q�{TP�/�T
��rW5�Wx�5}��%4l{��7�ؖ)��p�[-�Ng18��Lr#�ߊL�����,0a͛�W���Bc������B������wIʪJ�)f��W�å������d�^'g������6��_���������n䓙�`BO�ly\�>�/�A��-:c�����1qc0�&##%߫s�B�U�Ss���i��U^vj+��
�<+�q��s5oJ;7~|���L��7@�!oJ������G��v�\�1�]��ux�b�U�ܴ�=�^�G
��}?�#W��      R
     x�%QɍA{S�����\&�8�6	7\�qs{˭�Dw����U�!�diE8�=ۀt3�?bj�&�=���]s2m�@�� ���``���ւ��M-�N�3���j��뛖P?��OY��,6:[�_Z|J��4 nxK�p	%��㟸����Nx�W��/f�%I��?ƒ���ш��<��gCt�<E�j|��9�U#^s�fqg�N�2����)[sH��K(R/B��K�OM��7p1�<��=P*&���U�#��;S�҇�jڈ��[k��PXZ      W
   �   x�]��j�0Dϫ����ެ&�Ĥ��!В�6��D2�U�~}��:nO;̼eg(�륦�Ԁ��U��<�u�;t.��nUs2��5}1V��0F����z���Z�J�<|ҵ��&�qk0�^�~kR�RRgwXM����k� �D�nb����	���G(��ϲ:+\}��G�`����莛�U=��I�@�@�Fg2K��=�<��9O��+{F� �y      I
   �   x�]�A�@ ��+x�1
�� ��K-�V6m%�ߋW.s�L�,~�>��U�c��NG�I������.��$T�!����9$3(�E�C+#���x�������!���B�oC���_�>�"UӎR\�%�)��e��T#���x[!�D�??      U
   �   x�5�K�� ��0�ڿ w���cT�̆
qk;���������iJ
|^�X�pK�R`�),�j-��٫�a�T1
 �o��z̷ ��V_�֬��tD=��&9���o�fζ�6�H&�*�{	���y��͜c�0"�G�Ex�u�LQf�d�7�Ky�����`��S5y/�G�x�ǘ��?k�?;	      M
   t  x�u�A��0E��)x�	,�N�ec`<���p�
t�F�-D�Yi1����m6]	 ��?+�y�pg�逝�ǽ���Y5��<@�D!�������<CYfh� �ϖ"�t<A�r�~�2��2]��q�hS��Z4�`�)��h�WO>~-k|���-c�XPU�Ep��s�#��u%���v��K2�%�WV�+���5�_[쥒�B��ӫq��ڸ�l�$�,���ew��ΐKf"��ڬi�:)TsJ��Ϥ����h��r)�e2l5��-�&�ƍ��덐5d,��=s�Q}=�l`�~���ZVt�Y=Ŕ���B(	m��O�9|cjS	���m ms�	]�
�p M�V*��w�nG>�ΰ��m%��1��z      a
   |   x�%N�1z�b2�^���_G`�A�� fB���Ӹ���=�:hzwѲūn��H�=�N�V�G���L�Et[}�W��,��<6$�6)z
�γY'�n^��/���d������離~�c�      ^
   {   x�%��A�v0�1������ښP���r8hN\׆�$ǆ
�/4=4��P΃lL��1fH7i�()�FU��ɋ2JC��qj��OyYm9w+v^��?�_�N�'���#�6_      [
   �   x�u��j� ���׋���ۡ3R�Ԉ�
���u��jKΞ��%�d��qu�C�b:&ާ�rY�%��P���_v3����I�u��_��P	�oIa��~�wɇy����ŭ[(ޕ�O��7�_��C��v�ڪ�f��JճQ"���R�O��ӑ�p�?j@���~��`�7L	��ֲ`��`��H3�������`��2r���(���2�v?�E!�o������>��ӎ�ۇ�[��      O
   i   x�3�t�IL/.ILK�0302�2�I�-H�05�0�2��K-O*-�TH,��4462�2	*D�e+8g�Trr�r��+8�$��sZ����p��qqq 7��     