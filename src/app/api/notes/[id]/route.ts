import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

interface Params {
	params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
	const { id } = params;
	try {
		const note = await prisma.note.findUnique({
			where: { id: Number(id) },
		});

		if (!note) return NextResponse.json({ message: `Note ${id} not found` }, { status: 404 });

		return NextResponse.json(note);
	} catch (error) {
		if (error instanceof Error) {
			NextResponse.json({ message: error.message });
		}
	}
}

export async function PUT(request: Request, { params }: Params) {
	const { id } = params;

	try {
		const note = await prisma.note.findUnique({
			where: { id: Number(id) },
		});

		if (!note) return NextResponse.json({ message: `Note ${id} not found` }, { status: 404 });

		const { title, content } = await request.json();
		const updatedNote = await prisma.note.update({
			where: { id: Number(id) },
			data: {
				title,
				content,
			},
		});

		return NextResponse.json({ message: `Note ${id} updated`, updatedNote });
	} catch (error) {
		if (error instanceof Error) {
			NextResponse.json({ message: error.message });
		}
	}
}

export async function DELETE(request: Request, { params }: Params) {
	const { id } = params;
	try {
		const note = await prisma.note.findUnique({
			where: { id: Number(id) },
		});

		if (!note) return NextResponse.json({ message: `Note ${id} not found` }, { status: 404 });

		await prisma.note.delete({
			where: { id: Number(note.id) },
		});

		return NextResponse.json({ message: `Note ${id} deleted`, note });
	} catch (error) {
		if (error instanceof Error) {
			NextResponse.json({ message: error.message });
		}
	}
}
